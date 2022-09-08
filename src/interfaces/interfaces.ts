import * as models from "@prisma/client";

export type CreateAndAuthenticateUser = Omit<models.Users, "id">;
export type CreateCard = Omit<models.Cards, "id" | "userId">;
