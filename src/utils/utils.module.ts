import { Module } from "@nestjs/common";
import { MediaUtils } from "./media.utils";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports:[
        HttpModule
    ],
    providers: [MediaUtils],
    exports: [MediaUtils]
})
export class UtilsModule{}