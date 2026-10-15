---
title: 'Stop Seeding With Generic Faker Data: Write a Domain Provider in Laravel'
date: '2026-10-15'
excerpt: 'In a Laravel app, generic Faker data quietly undermines a stakeholder demo. Teach Faker your domain once with a small PHP provider, and keep using factories and seeders everywhere.'
categories: 'Tooling'
---

Your Laravel seeder runs `fake()->city()` and your local database fills with "Lake Gerardchester" and "Port Hettie". For a unit test, fine. Nobody reads it.

But the moment you demo the app to a stakeholder who knows the domain, generic Faker data quietly undermines you. A directory of venues full of "123 Fake St, Smithville" reads as a toy. Realistic data, names and places that look like the real thing, makes the same screen feel like a product. The fix isn't to hand-write a seeder full of literals. It's to teach Faker your domain once, then keep using factories and seeders as usual.

This is a walkthrough for Laravel and plain PHP: write a custom Faker provider, register it in a Laravel app, then use it from a factory and a seeder. If you already use `fake()` in your factories, you can follow along as is.

### 1. A provider that knows your domain

A Faker provider is just a PHP class extending `Faker\Provider\Base` with public methods. Curate a few short lists and expose one small method per thing a factory needs:

```php filename="app/Faker/VenueFakerProvider.php"
use Faker\Provider\Base;

final class VenueFakerProvider extends Base
{
    /** @var list<string> */
    private const array AREAS = ['Old Town', 'Riverside', 'Harbour Quarter', 'Hillside', 'Market District'];

    /** @var list<string> */
    private const array KINDS = ['Cafe', 'Studio', 'Workshop', 'Hall', 'Gallery'];

    /** @var list<string> */
    private const array HOSTS = ['Maria Alvarez', 'David Okoye', 'Amina Rahman', 'Lucas Moreau'];

    public function venueArea(): string
    {
        return self::randomElement(self::AREAS);
    }

    public function venueHost(): string
    {
        return self::randomElement(self::HOSTS);
    }

    public function venueName(): string
    {
        return self::randomElement(self::KINDS) . ' ' . self::randomElement(self::AREAS);
    }

    public function venueCode(): string
    {
        return self::numerify('VN-#####');
    }
}
```

Small methods that return strings compose better in factories than one method returning an array. And `numerify` is the right tool for any identifier with a fixed layout: phone numbers, tax IDs, reference codes. The provider is where your domain's formats live. (`private const array` needs PHP 8.3 or newer. On older versions, use a `private const AREAS = [...]` without the type.)

### 2. Register it in Laravel, in dev and test only

Here's the part that's easy to get wrong. In Laravel, `fake()` and the `$this->faker` inside factories do not resolve the same generator. Attach your provider to only one and half your factories won't know the new methods. Give the registration its own service provider and add the provider to both:

```php filename="app/Providers/FakerServiceProvider.php"
final class FakerServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        foreach ([fake(), $this->app->make(Generator::class)] as $faker) {
            $faker->addProvider(new VenueFakerProvider($faker));
        }
    }
}
```

Then register it only where Faker actually exists:

```php filename="app/Providers/AppServiceProvider.php"
public function register(): void
{
    // Faker is a dev dependency: only register where it is installed.
    if ($this->app->environment(['local', 'testing']) && class_exists(Generator::class)) {
        $this->app->register(FakerServiceProvider::class);
    }
}
```

Two details matter. First, an allowlist (`local`, `testing`) is safer than a denylist like "anything but production": a staging box shouldn't be seeding fake venues either. Second, Faker is a dev dependency in Laravel. On a `composer install --no-dev` the `Generator` class isn't there at all, so the `class_exists` check keeps the app from touching a class that doesn't exist.

### 3. Use it in a factory

Your provider methods are now ordinary Faker methods, available on `fake()` like `name()` or `email()`:

```php filename="database/factories/VenueFactory.php"
final class VenueFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->venueName(),
            'host' => fake()->venueHost(),
            'area' => fake()->venueArea(),
            'code' => fake()->optional()->venueCode(),
        ];
    }
}
```

Modifiers like `optional()` and `unique()` work on them too, because they're regular Faker methods.

### 4. Use it in a seeder

The factory is where the payoff starts. The seeder is where you see it. A seeder only has to ask for rows:

```php filename="database/seeders/VenueSeeder.php"
final class VenueSeeder extends Seeder
{
    public function run(): void
    {
        Venue::factory()->count(12)->create();
    }
}
```

Call it from `DatabaseSeeder`, then rebuild the database:

```bash
php artisan migrate:fresh --seed
```

Your `venues` table now holds 12 rows that look like this, instead of a wall of lorem ipsum:

```
Cafe Riverside        Maria Alvarez   Riverside         VN-48213
Workshop Old Town     David Okoye     Old Town          null
Gallery Hillside      Amina Rahman    Hillside          VN-90577
```

Every factory, every seeder, every test now produces data that looks like your domain, with zero literals scattered around. And the next teammate who runs `migrate:fresh --seed` gets a believable demo database without asking you for a SQL dump. And when those rows reach a public page, map them through a DTO first, as described in [Your model has fields the public should never see](/blog/dto-view-boundary).

### 5. Watch `unique()` against short lists

That last part has a trap. `fake()->unique()->venueArea()` can only return five different values. The sixth call throws an `OverflowException`, and it usually does so deep inside a seeder you haven't run in a month.

The cheap fix is to widen the pool by combining lists. `venueName()` pairs a kind with an area, so five kinds and five areas give 25 distinct names instead of five. It's still finite, so if you seed hundreds of unique rows you need more entries or a numeric suffix. But it moves the limit far enough for most seeders, and it fails loudly rather than silently duplicating.

### The one honest caveat

Realistic is not real. Curated seed data is still fake, and the better it looks the easier it is to forget that. Label demo screenshots as sample data, and never let "looks plausible" leak into a place where someone might treat it as a source of truth. The provider buys you a convincing demo, not a dataset.
