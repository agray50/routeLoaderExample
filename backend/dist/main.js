"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const pipes_1 = require("./common/pipes");
const filters_1 = require("./common/filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(pipes_1.globalValidationPipe);
    app.useGlobalFilters(new filters_1.ApiExceptionFilter());
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.listen(3000);
    console.log('Backend running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map