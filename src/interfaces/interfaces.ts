import * as models from "@prisma/client";

export type CreateAndAuthenticateUser = Omit<models.Users, "id">;
export type CreateSession = Omit<models.Sessions, "id">;
