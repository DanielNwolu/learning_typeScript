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

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

// Utility type to exclude `type` field from filtering criteria
type Criteria<T> = Partial<Omit<T, 'type'>>;

export function filterPersons<T extends Person>(
    persons: Person[],
    personType: T['type'],
    criteria: Criteria<T>
): T[] {
    return persons
        .filter((person): person is T => person.type === personType) // Type narrowing to prevent runtime error
        .filter((person) => {
            const criteriaKeys = Object.keys(criteria) as (keyof T)[]; // Ensure valid keys of T
            
            return criteriaKeys.every((fieldName) => 
                person[fieldName] === (criteria as T)[fieldName]
            );
        });
}


export const usersOfAge23 = filterPersons<User>(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons<Admin>(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
