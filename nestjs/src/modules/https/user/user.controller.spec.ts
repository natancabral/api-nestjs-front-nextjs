import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserIdDto } from "./dto/user-id.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
  let userController: UserController;

  const userService = {
    createAsync: jest.fn(),
    findAllAsync: jest.fn(),
    findOneAsync: jest.fn(),
    updateAsync: jest.fn(),
    removeAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(userController).toBeDefined();
  });

  describe("create", () => {
    it("should create a user", async () => {
      const payload: UserCreateDto = {
        fullName: "John",
        email: "john@example.com",
        cpf: "12345678901",
        birthDate: "1990-01-01",
        phone: "479977888888",
        internationalPhoneCode: 55,
      };
      userService.createAsync.mockResolvedValue({ id: 1, ...payload });

      const result = await userController.create(payload);

      expect(result).toEqual({ id: 1, ...payload });
      expect(userService.createAsync).toHaveBeenCalledWith(payload);
    });
  });

  describe("findAll", () => {
    it("should return all users", async () => {
      const users = [{ id: 1, fullName: "John" }];
      userService.findAllAsync.mockResolvedValue(users);

      const result = await userController.findAll();

      expect(result).toEqual(users);
      expect(userService.findAllAsync).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a user by ID", async () => {
      const user = { id: 1, fullName: "John" };
      userService.findOneAsync.mockResolvedValue(user);

      const params: UserIdDto = { id: 1 };
      const result = await userController.findOne(params);

      expect(result).toEqual(user);
      expect(userService.findOneAsync).toHaveBeenCalledWith(params.id);
    });
  });
  describe("update", () => {
    it("should update a user", async () => {
      const params: UserIdDto = { id: 1 };
      const payload: UserUpdateDto = {
        fullName: "John Doe",
        birthDate: "",
        phone: "",
        internationalPhoneCode: 1,
      };
      const updatedUser = { id: 1, ...payload };
      userService.updateAsync.mockResolvedValue(updatedUser);

      const result = await userController.update(params, payload);

      expect(result).toEqual(updatedUser);
      expect(userService.updateAsync).toHaveBeenCalledWith(params.id, payload);
    });
  });
  describe("remove", () => {
    it("should remove a user", async () => {
      const params: UserIdDto = { id: 1 };
      userService.removeAsync.mockResolvedValue(true);

      const result = await userController.remove(params);

      expect(result).toEqual(true);
      expect(userService.removeAsync).toHaveBeenCalledWith(params.id);
    });
  });
});
