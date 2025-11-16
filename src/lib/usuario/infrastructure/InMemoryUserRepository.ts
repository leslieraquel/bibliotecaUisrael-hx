import { User } from "../domain/User";
import { UserCi } from "../domain/UserCi";
import { UserName } from "../domain/UserName";
import { UserEmail } from "../domain/UserEmail";
import { UserPassword } from "../domain/UserPassword";
import { UserCreatedAt } from "../domain/UserCreatedAt";
import { UserUpdateAt } from "../domain/UserUpdateAt";
import { UserRepository } from "../domain/UserRepository";
import { UserModel } from "./modelUser"; 

export class InMemoryUserRepository implements UserRepository {
  async create(us: User): Promise<void> {
    const primitive = us.mapToPrimitives();
    await UserModel.create({
      ...primitive,
      updateAt: us.updateAt.value,
    });
  }


    async getAll(): Promise<User[]> {
        const docs = await UserModel.find().lean();
        return docs.map(u => 
            new User(
            new UserCi(u.ci),
            new UserName(u.name),
            new UserEmail(u.email),
            new UserPassword(u.password),
            new UserCreatedAt(u.createdAt),
            new UserUpdateAt(u.updateAt)
            )
        );
    }

    async getOneById(ci: UserCi): Promise<User | null> {
        const u = await UserModel.findOne({ ci: ci.value }).lean();
        if (!u) return null;

        return new User(
            new UserCi(u.ci),
            new UserName(u.name),
            new UserEmail(u.email),
            new UserPassword(u.password),
            new UserCreatedAt(u.createdAt),
            new UserUpdateAt(u.updateAt)
        );
    }

    async edit(user: User): Promise<void> {
        await UserModel.updateOne(
            { ci: user.ci.value },
            {
                $set: {
                    name: user.name.value,
                    email: user.email.value,
                    password: user.password.value,
                    updatedAt: user.updateAt.value
                }
            }
        );
    }

    async delete(ci: UserCi): Promise<void> {
        await UserModel.deleteOne({ ci: ci.value });
    }
}