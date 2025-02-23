# Type-Safe Person Filtering in TypeScript

## Project Overview

This implementation demonstrates a robust type-safe filtering mechanism for user/admin data structures. The `filterPersons` function dynamically returns properly typed arrays (`User[]` or `Admin[]`) based on search criteria while enforcing strict TypeScript validation throughout the filtering process.

## Implementation Breakdown

### 1. Data Type Definitions

**Core Interfaces:**
```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;
```

### 2. Example Dataset

**Sample user/admin records:**
```ts
export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
  { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];
```

### 3. Data Inspection Utility

**Console logging helper:**
```ts
export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${person.type === 'admin' 
      ? person.role 
      : person.occupation}`
  );
}
```

### 4. Initial Implementation (Flawed)

**Original problematic implementation:**
```ts
export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: unknown
): unknown[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      const criteriaKeys = Object.keys(criteria) as (keyof Person)[];
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}
```

**Identified Issues:**
- Type-unsafe string parameter for `personType`
- Unvalidated `criteria` object structure
- Weak return type (`unknown[]`)
- Potential runtime errors from invalid property access

### 5. Enhanced Implementation

**Type-safe solution:**
```ts
type Criteria<T> = Partial<Omit<T, 'type'>>;

export function filterPersons<T extends Person>(
  persons: Person[],
  personType: T['type'],
  criteria: Criteria<T>
): T[] {
  return persons
    .filter((person): person is T => person.type === personType)
    .filter((person) => {
      const criteriaKeys = Object.keys(criteria) as (keyof T)[];
      return criteriaKeys.every((fieldName) =>
        person[fieldName] === (criteria as T)[fieldName]
      );
    });
}
```

**Key Enhancements:**
1. **Generic Type Parameter (`T extends Person`)**  
   Enforces strict return type matching (User[] or Admin[])

2. **Literal Type Constraint (`T['type']`)**  
   Restricts `personType` to exact 'user' | 'admin' values

3. **Criteria Validation (`Criteria<T>`)**  
   Excludes 'type' field and allows partial property matching

4. **Type Predicate Filter**  
   Uses `person is T` for proper type narrowing

## Implementation Usage

**Type-safe filtering examples:**
```ts
// Get users aged 23
const youngUsers = filterPersons<User>(persons, 'user', { age: 23 });

// Find admins with specific role
const adminSearch = filterPersons<Admin>(persons, 'admin', { role: 'Anti-virus engineer' });

console.log('Matching Users:');
youngUsers.forEach(logPerson);

console.log('\nFound Admins:');
adminSearch.forEach(logPerson);
```

## Execution Instructions

**Setup and execution:**
```bash
# Install required dependencies
npm install --save-dev typescript ts-node

# Run the TypeScript implementation
ts-node src/person-filter.ts

# Alternative execution from source directory
cd src/ && ts-node person-filter.ts
```

## Technical Summary

This solution leverages TypeScript's advanced type system to create a type-safe filtering mechanism that:
- Ensures valid user/admin type discrimination
- Validates filter criteria at compile-time
- Provides precise return type inference
- Eliminates unsafe type assertions
- Maintains full IDE type hinting support

The implementation demonstrates effective use of generics, type narrowing, and utility types to create robust domain-specific filters while maintaining TypeScript's type safety guarantees.