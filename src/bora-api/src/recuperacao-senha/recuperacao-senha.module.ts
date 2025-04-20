import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecoveryController } from './recuperacao-senha.controller';
import { RecoveryService } from './recuperacao-senha.service';
import { Recovery, RecoverySchema } from './schema/recuperacao-senha.schema';
import { RecuperacaoSenhaRepository } from './repository/recuperacao-senha.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recovery.name, schema: RecoverySchema },
    ]),
  ],
  controllers: [RecoveryController],
  providers: [RecuperacaoSenhaRepository, RecoveryService],
  exports: [RecoveryService],
})
export class RecoveryModule {}
