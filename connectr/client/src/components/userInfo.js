export class User {
    setVal(firstName, lastName, password, email, phone, country, birthday, family) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.birthday = birthday;
        this.family = family;
    }
}

export var user = new User();

