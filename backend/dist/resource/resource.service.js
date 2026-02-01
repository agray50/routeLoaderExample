"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resource_entity_1 = require("./resource.entity");
const integration_service_1 = require("../integration/integration.service");
let ResourceService = class ResourceService {
    constructor(resourceRepository, integrationService) {
        this.resourceRepository = resourceRepository;
        this.integrationService = integrationService;
        this.creationLocks = new Map();
    }
    async getOrCreate(dto) {
        const existing = await this.resourceRepository.findOne({
            where: { uuid: dto.uuid },
        });
        if (existing) {
            return this.toResponseDto(existing);
        }
        if (this.creationLocks.has(dto.uuid)) {
            const resource = await this.creationLocks.get(dto.uuid);
            return this.toResponseDto(resource);
        }
        const creationPromise = this.createResource(dto);
        this.creationLocks.set(dto.uuid, creationPromise);
        try {
            const resource = await creationPromise;
            return this.toResponseDto(resource);
        }
        finally {
            this.creationLocks.delete(dto.uuid);
        }
    }
    async createResource(dto) {
        const user = await this.integrationService.getUserByUuid(dto.uuid);
        const name = user?.name || `Resource ${dto.uuid.slice(0, 8)}`;
        const resource = this.resourceRepository.create({
            uuid: dto.uuid,
            name,
        });
        await this.resourceRepository
            .createQueryBuilder()
            .insert()
            .into(resource_entity_1.Resource)
            .values(resource)
            .orIgnore()
            .execute();
        const saved = await this.resourceRepository.findOne({
            where: { uuid: dto.uuid },
        });
        return saved;
    }
    toResponseDto(resource) {
        return {
            uuid: resource.uuid,
            name: resource.name,
            createdAt: resource.createdAt.toISOString(),
        };
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resource_entity_1.Resource)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        integration_service_1.IntegrationService])
], ResourceService);
//# sourceMappingURL=resource.service.js.map