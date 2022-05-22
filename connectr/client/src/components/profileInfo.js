export class Profile{
    Profile(username, email, country, birthday) {
        this.username = username;
        this.email = email;
        this.country = country;
        this.birthday = birthday;
    }
    setVal(username, email, country, birthday) {
        this.username = username;
        this.email = email;
        this.country = country;
        this.birthday = birthday;
    }
}

export var profile = new Profile();