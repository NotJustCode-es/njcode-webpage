import { Module } from '@nestjs/common';
import { ContentfulApiModule } from '@server/contentful-api/contentful-api.module';
import { RootController } from '@server/root/root.controller';
import { RootService } from '@server/root/root.service';

@Module({
  providers: [
    RootService,
  ],
  controllers: [
    RootController,
  ],
  imports: [
    ContentfulApiModule,
  ],
})
export class RootModule { }
