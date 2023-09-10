import { NestFactory } from "@nestjs/core"
import { SeedModule } from "./seed.module"
import { RoleSeedService } from "./role/role.service"
import { PostSeedService } from "./post/post.service"
import { UserSeedService } from "./user/user.service"

const runSeed =async () => {
    const app = await NestFactory.create(SeedModule)

    await app.get(RoleSeedService).run();
    await app.get(UserSeedService).run();
    await app.get(PostSeedService).run();

    await app.close();
}

void runSeed();