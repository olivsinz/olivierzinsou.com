---
title: 'Your model has fields the public should never see. Map to a DTO.'
date: '2026-06-29'
excerpt: 'A public page only needs a few fields. The Eloquent model behind it knows a lot more. Here is how a DTO stops the extra fields from riding along.'
category: 'Architecture'
---

A public directory page needs very little: where each venue is, and when it meets. The Eloquent model behind it knows much more. It carries the host's full name, an internal reference code used only in the back office, an active/inactive status, timestamps. None of that belongs on a public page, and one of those fields is a real person's name.

The tempting move is to pass the model to the view and render the three fields you want. It works on day one. The problem is everything after day one.

### The silent leak

Pass the model through and your page is implicitly coupled to the table. Add a column six months later, a phone number, an internal note, a geocode, and it's now one careless `{{ $venue->whatever }}` or one `v-for` over the props away from the public. Nobody decided to expose it. It just rode along because the whole record was in scope.

A DTO flips the default. You map, by hand, to exactly the fields that are allowed out:

```php filename="app/Data/VenueData.php"
final class VenueData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $area,
        public readonly string $address,
        public readonly ?string $scheduleNote,
    ) {}

    public static function fromModel(Venue $venue): self
    {
        return new self(
            id: $venue->id,
            area: $venue->area,
            address: $venue->address,
            scheduleNote: $venue->schedule_note,
        );
    }
}
```

The host name and the internal code are not omitted by accident. They're absent because nobody added them to the mapper. Exposing a new field now requires an explicit edit, in a file whose entire job is "what the public may see". That edit is the moment a reviewer can catch it.

> The DTO is the allowlist. The discipline is never bypassing it.

### Be precise about what this buys you

A DTO is not, by itself, a security feature. If you still hand the model to the view somewhere, the DTO protects nothing. The safety comes from a rule the DTO makes easy to keep: the view layer only ever receives DTOs, never Eloquent models. The DTO is the allowlist. The discipline is never bypassing it.

Once that rule holds, the question "could this page leak a field?" has a single, readable answer: look at the DTO. If it isn't in there, it doesn't go out.
