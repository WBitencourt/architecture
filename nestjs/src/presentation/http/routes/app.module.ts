import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [ExampleModule], //importa os modulos que precisarem para o modulo atual funcionar, usando os providers(services) deles
  controllers: [AppController], //adiciona os controllers para o modulo e permite disponibilizar as rotas para o mundo externo
  providers: [AppService], //apenas esse modulo tem acesso, ou seja, o controller precisa do service para funcionar
  exports: [], //exporta os providers(services) para outros modulos que precisarem
})
export class AppModule {}
