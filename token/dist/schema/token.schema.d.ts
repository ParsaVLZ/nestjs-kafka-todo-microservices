import { HydratedDocument, Types } from "mongoose";
export declare class Token {
    userId: string;
    token: string;
}
export type TokenDocument = HydratedDocument<Token>;
export declare const TokenSchema: import("mongoose").Schema<Token, import("mongoose").Model<Token, any, any, any, import("mongoose").Document<unknown, any, Token, any, {}> & Token & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Token, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Token>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Token> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
