import type { UserType } from "../model/UserType";

export default class UserDao {

    static authenticate(login:string, password:string) : Promise<UserType|null> {
        return new Promise((resolve, _) => {
            setTimeout(
                () => {
                    if(login == "user" && password == "123") {
                        resolve({
                            name: "Опытный пользователь",
                            email: "user@i.ua",
                            address: "Город, Улица",
                            login: "user",
                            dob: "08 декабря 2025",
                            imageUrl: "/img/user.jpg"
                        })
                    }
                    else resolve(null);
                },
                700,
            )
        });
    }
}