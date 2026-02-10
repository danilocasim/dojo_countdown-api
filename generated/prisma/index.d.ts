
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model UsageStats
 * 
 */
export type UsageStats = $Result.DefaultSelection<Prisma.$UsageStatsPayload>
/**
 * Model Countdown
 * 
 */
export type Countdown = $Result.DefaultSelection<Prisma.$CountdownPayload>
/**
 * Model UsageMonth
 * 
 */
export type UsageMonth = $Result.DefaultSelection<Prisma.$UsageMonthPayload>
/**
 * Model CustomFont
 * 
 */
export type CustomFont = $Result.DefaultSelection<Prisma.$CustomFontPayload>
/**
 * Model BackgroundImage
 * 
 */
export type BackgroundImage = $Result.DefaultSelection<Prisma.$BackgroundImagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Plan: {
  FREE: 'FREE',
  BOOTSTRAP: 'BOOTSTRAP',
  STARTUP: 'STARTUP',
  ENTERPRISE: 'ENTERPRISE'
};

export type Plan = (typeof Plan)[keyof typeof Plan]


export const CountdownStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  DISABLED: 'DISABLED'
};

export type CountdownStatus = (typeof CountdownStatus)[keyof typeof CountdownStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Plan = $Enums.Plan

export const Plan: typeof $Enums.Plan

export type CountdownStatus = $Enums.CountdownStatus

export const CountdownStatus: typeof $Enums.CountdownStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageStats`: Exposes CRUD operations for the **UsageStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageStats
    * const usageStats = await prisma.usageStats.findMany()
    * ```
    */
  get usageStats(): Prisma.UsageStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.countdown`: Exposes CRUD operations for the **Countdown** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countdowns
    * const countdowns = await prisma.countdown.findMany()
    * ```
    */
  get countdown(): Prisma.CountdownDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageMonth`: Exposes CRUD operations for the **UsageMonth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageMonths
    * const usageMonths = await prisma.usageMonth.findMany()
    * ```
    */
  get usageMonth(): Prisma.UsageMonthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customFont`: Exposes CRUD operations for the **CustomFont** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomFonts
    * const customFonts = await prisma.customFont.findMany()
    * ```
    */
  get customFont(): Prisma.CustomFontDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.backgroundImage`: Exposes CRUD operations for the **BackgroundImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BackgroundImages
    * const backgroundImages = await prisma.backgroundImage.findMany()
    * ```
    */
  get backgroundImage(): Prisma.BackgroundImageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.1
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RefreshToken: 'RefreshToken',
    UsageStats: 'UsageStats',
    Countdown: 'Countdown',
    UsageMonth: 'UsageMonth',
    CustomFont: 'CustomFont',
    BackgroundImage: 'BackgroundImage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "refreshToken" | "usageStats" | "countdown" | "usageMonth" | "customFont" | "backgroundImage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      UsageStats: {
        payload: Prisma.$UsageStatsPayload<ExtArgs>
        fields: Prisma.UsageStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>
          }
          findFirst: {
            args: Prisma.UsageStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>
          }
          findMany: {
            args: Prisma.UsageStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>[]
          }
          create: {
            args: Prisma.UsageStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>
          }
          createMany: {
            args: Prisma.UsageStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>[]
          }
          delete: {
            args: Prisma.UsageStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>
          }
          update: {
            args: Prisma.UsageStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>
          }
          deleteMany: {
            args: Prisma.UsageStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>[]
          }
          upsert: {
            args: Prisma.UsageStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageStatsPayload>
          }
          aggregate: {
            args: Prisma.UsageStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageStats>
          }
          groupBy: {
            args: Prisma.UsageStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageStatsCountArgs<ExtArgs>
            result: $Utils.Optional<UsageStatsCountAggregateOutputType> | number
          }
        }
      }
      Countdown: {
        payload: Prisma.$CountdownPayload<ExtArgs>
        fields: Prisma.CountdownFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountdownFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountdownFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          findFirst: {
            args: Prisma.CountdownFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountdownFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          findMany: {
            args: Prisma.CountdownFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>[]
          }
          create: {
            args: Prisma.CountdownCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          createMany: {
            args: Prisma.CountdownCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CountdownCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>[]
          }
          delete: {
            args: Prisma.CountdownDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          update: {
            args: Prisma.CountdownUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          deleteMany: {
            args: Prisma.CountdownDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountdownUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CountdownUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>[]
          }
          upsert: {
            args: Prisma.CountdownUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          aggregate: {
            args: Prisma.CountdownAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountdown>
          }
          groupBy: {
            args: Prisma.CountdownGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountdownGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountdownCountArgs<ExtArgs>
            result: $Utils.Optional<CountdownCountAggregateOutputType> | number
          }
        }
      }
      UsageMonth: {
        payload: Prisma.$UsageMonthPayload<ExtArgs>
        fields: Prisma.UsageMonthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageMonthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageMonthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>
          }
          findFirst: {
            args: Prisma.UsageMonthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageMonthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>
          }
          findMany: {
            args: Prisma.UsageMonthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>[]
          }
          create: {
            args: Prisma.UsageMonthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>
          }
          createMany: {
            args: Prisma.UsageMonthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageMonthCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>[]
          }
          delete: {
            args: Prisma.UsageMonthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>
          }
          update: {
            args: Prisma.UsageMonthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>
          }
          deleteMany: {
            args: Prisma.UsageMonthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageMonthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageMonthUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>[]
          }
          upsert: {
            args: Prisma.UsageMonthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMonthPayload>
          }
          aggregate: {
            args: Prisma.UsageMonthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageMonth>
          }
          groupBy: {
            args: Prisma.UsageMonthGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageMonthGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageMonthCountArgs<ExtArgs>
            result: $Utils.Optional<UsageMonthCountAggregateOutputType> | number
          }
        }
      }
      CustomFont: {
        payload: Prisma.$CustomFontPayload<ExtArgs>
        fields: Prisma.CustomFontFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomFontFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomFontFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          findFirst: {
            args: Prisma.CustomFontFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomFontFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          findMany: {
            args: Prisma.CustomFontFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>[]
          }
          create: {
            args: Prisma.CustomFontCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          createMany: {
            args: Prisma.CustomFontCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomFontCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>[]
          }
          delete: {
            args: Prisma.CustomFontDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          update: {
            args: Prisma.CustomFontUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          deleteMany: {
            args: Prisma.CustomFontDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomFontUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomFontUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>[]
          }
          upsert: {
            args: Prisma.CustomFontUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          aggregate: {
            args: Prisma.CustomFontAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomFont>
          }
          groupBy: {
            args: Prisma.CustomFontGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomFontGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomFontCountArgs<ExtArgs>
            result: $Utils.Optional<CustomFontCountAggregateOutputType> | number
          }
        }
      }
      BackgroundImage: {
        payload: Prisma.$BackgroundImagePayload<ExtArgs>
        fields: Prisma.BackgroundImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BackgroundImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BackgroundImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>
          }
          findFirst: {
            args: Prisma.BackgroundImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BackgroundImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>
          }
          findMany: {
            args: Prisma.BackgroundImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>[]
          }
          create: {
            args: Prisma.BackgroundImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>
          }
          createMany: {
            args: Prisma.BackgroundImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BackgroundImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>[]
          }
          delete: {
            args: Prisma.BackgroundImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>
          }
          update: {
            args: Prisma.BackgroundImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>
          }
          deleteMany: {
            args: Prisma.BackgroundImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BackgroundImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BackgroundImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>[]
          }
          upsert: {
            args: Prisma.BackgroundImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundImagePayload>
          }
          aggregate: {
            args: Prisma.BackgroundImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackgroundImage>
          }
          groupBy: {
            args: Prisma.BackgroundImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<BackgroundImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.BackgroundImageCountArgs<ExtArgs>
            result: $Utils.Optional<BackgroundImageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    usageStats?: UsageStatsOmit
    countdown?: CountdownOmit
    usageMonth?: UsageMonthOmit
    customFont?: CustomFontOmit
    backgroundImage?: BackgroundImageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refreshTokens: number
    countdowns: number
    usageMonths: number
    customFonts: number
    backgroundImages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    countdowns?: boolean | UserCountOutputTypeCountCountdownsArgs
    usageMonths?: boolean | UserCountOutputTypeCountUsageMonthsArgs
    customFonts?: boolean | UserCountOutputTypeCountCustomFontsArgs
    backgroundImages?: boolean | UserCountOutputTypeCountBackgroundImagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCountdownsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountdownWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUsageMonthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageMonthWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCustomFontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomFontWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBackgroundImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackgroundImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    rolloverCredits: number | null
  }

  export type UserSumAggregateOutputType = {
    rolloverCredits: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    plan: $Enums.Plan | null
    isActive: boolean | null
    isVerified: boolean | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    subscriptionStatus: string | null
    currentPeriodEnd: Date | null
    rolloverCredits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    plan: $Enums.Plan | null
    isActive: boolean | null
    isVerified: boolean | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    subscriptionStatus: string | null
    currentPeriodEnd: Date | null
    rolloverCredits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    plan: number
    isActive: number
    isVerified: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    stripePriceId: number
    subscriptionStatus: number
    currentPeriodEnd: number
    rolloverCredits: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    rolloverCredits?: true
  }

  export type UserSumAggregateInputType = {
    rolloverCredits?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    plan?: true
    isActive?: true
    isVerified?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    subscriptionStatus?: true
    currentPeriodEnd?: true
    rolloverCredits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    plan?: true
    isActive?: true
    isVerified?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    subscriptionStatus?: true
    currentPeriodEnd?: true
    rolloverCredits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    plan?: true
    isActive?: true
    isVerified?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    subscriptionStatus?: true
    currentPeriodEnd?: true
    rolloverCredits?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    role: $Enums.Role
    plan: $Enums.Plan
    isActive: boolean
    isVerified: boolean
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    subscriptionStatus: string | null
    currentPeriodEnd: Date | null
    rolloverCredits: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    plan?: boolean
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    rolloverCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    usageStats?: boolean | User$usageStatsArgs<ExtArgs>
    countdowns?: boolean | User$countdownsArgs<ExtArgs>
    usageMonths?: boolean | User$usageMonthsArgs<ExtArgs>
    customFonts?: boolean | User$customFontsArgs<ExtArgs>
    backgroundImages?: boolean | User$backgroundImagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    plan?: boolean
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    rolloverCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    plan?: boolean
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    rolloverCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    plan?: boolean
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    subscriptionStatus?: boolean
    currentPeriodEnd?: boolean
    rolloverCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "plan" | "isActive" | "isVerified" | "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId" | "subscriptionStatus" | "currentPeriodEnd" | "rolloverCredits" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    usageStats?: boolean | User$usageStatsArgs<ExtArgs>
    countdowns?: boolean | User$countdownsArgs<ExtArgs>
    usageMonths?: boolean | User$usageMonthsArgs<ExtArgs>
    customFonts?: boolean | User$customFontsArgs<ExtArgs>
    backgroundImages?: boolean | User$backgroundImagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      usageStats: Prisma.$UsageStatsPayload<ExtArgs> | null
      countdowns: Prisma.$CountdownPayload<ExtArgs>[]
      usageMonths: Prisma.$UsageMonthPayload<ExtArgs>[]
      customFonts: Prisma.$CustomFontPayload<ExtArgs>[]
      backgroundImages: Prisma.$BackgroundImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      role: $Enums.Role
      plan: $Enums.Plan
      isActive: boolean
      isVerified: boolean
      stripeCustomerId: string | null
      stripeSubscriptionId: string | null
      stripePriceId: string | null
      subscriptionStatus: string | null
      currentPeriodEnd: Date | null
      rolloverCredits: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageStats<T extends User$usageStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$usageStatsArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    countdowns<T extends User$countdownsArgs<ExtArgs> = {}>(args?: Subset<T, User$countdownsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageMonths<T extends User$usageMonthsArgs<ExtArgs> = {}>(args?: Subset<T, User$usageMonthsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    customFonts<T extends User$customFontsArgs<ExtArgs> = {}>(args?: Subset<T, User$customFontsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    backgroundImages<T extends User$backgroundImagesArgs<ExtArgs> = {}>(args?: Subset<T, User$backgroundImagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly plan: FieldRef<"User", 'Plan'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly stripeSubscriptionId: FieldRef<"User", 'String'>
    readonly stripePriceId: FieldRef<"User", 'String'>
    readonly subscriptionStatus: FieldRef<"User", 'String'>
    readonly currentPeriodEnd: FieldRef<"User", 'DateTime'>
    readonly rolloverCredits: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.usageStats
   */
  export type User$usageStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    where?: UsageStatsWhereInput
  }

  /**
   * User.countdowns
   */
  export type User$countdownsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    where?: CountdownWhereInput
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    cursor?: CountdownWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CountdownScalarFieldEnum | CountdownScalarFieldEnum[]
  }

  /**
   * User.usageMonths
   */
  export type User$usageMonthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    where?: UsageMonthWhereInput
    orderBy?: UsageMonthOrderByWithRelationInput | UsageMonthOrderByWithRelationInput[]
    cursor?: UsageMonthWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageMonthScalarFieldEnum | UsageMonthScalarFieldEnum[]
  }

  /**
   * User.customFonts
   */
  export type User$customFontsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    where?: CustomFontWhereInput
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    cursor?: CustomFontWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomFontScalarFieldEnum | CustomFontScalarFieldEnum[]
  }

  /**
   * User.backgroundImages
   */
  export type User$backgroundImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    where?: BackgroundImageWhereInput
    orderBy?: BackgroundImageOrderByWithRelationInput | BackgroundImageOrderByWithRelationInput[]
    cursor?: BackgroundImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BackgroundImageScalarFieldEnum | BackgroundImageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    userAgent: string | null
    ipAddress: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    userAgent: string | null
    ipAddress: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    userAgent: number
    ipAddress: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    userAgent?: true
    ipAddress?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    userAgent?: true
    ipAddress?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    userAgent?: true
    ipAddress?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    userAgent: string | null
    ipAddress: string | null
    expiresAt: Date
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "userAgent" | "ipAddress" | "expiresAt" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      userAgent: string | null
      ipAddress: string | null
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly userAgent: FieldRef<"RefreshToken", 'String'>
    readonly ipAddress: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model UsageStats
   */

  export type AggregateUsageStats = {
    _count: UsageStatsCountAggregateOutputType | null
    _avg: UsageStatsAvgAggregateOutputType | null
    _sum: UsageStatsSumAggregateOutputType | null
    _min: UsageStatsMinAggregateOutputType | null
    _max: UsageStatsMaxAggregateOutputType | null
  }

  export type UsageStatsAvgAggregateOutputType = {
    countdownsCreated: number | null
    activeCountdowns: number | null
    monthlyViews: number | null
    totalViews: number | null
  }

  export type UsageStatsSumAggregateOutputType = {
    countdownsCreated: number | null
    activeCountdowns: number | null
    monthlyViews: number | null
    totalViews: number | null
  }

  export type UsageStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    countdownsCreated: number | null
    activeCountdowns: number | null
    monthlyViews: number | null
    totalViews: number | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    updatedAt: Date | null
  }

  export type UsageStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    countdownsCreated: number | null
    activeCountdowns: number | null
    monthlyViews: number | null
    totalViews: number | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    updatedAt: Date | null
  }

  export type UsageStatsCountAggregateOutputType = {
    id: number
    userId: number
    countdownsCreated: number
    activeCountdowns: number
    monthlyViews: number
    totalViews: number
    currentPeriodStart: number
    currentPeriodEnd: number
    updatedAt: number
    _all: number
  }


  export type UsageStatsAvgAggregateInputType = {
    countdownsCreated?: true
    activeCountdowns?: true
    monthlyViews?: true
    totalViews?: true
  }

  export type UsageStatsSumAggregateInputType = {
    countdownsCreated?: true
    activeCountdowns?: true
    monthlyViews?: true
    totalViews?: true
  }

  export type UsageStatsMinAggregateInputType = {
    id?: true
    userId?: true
    countdownsCreated?: true
    activeCountdowns?: true
    monthlyViews?: true
    totalViews?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    updatedAt?: true
  }

  export type UsageStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    countdownsCreated?: true
    activeCountdowns?: true
    monthlyViews?: true
    totalViews?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    updatedAt?: true
  }

  export type UsageStatsCountAggregateInputType = {
    id?: true
    userId?: true
    countdownsCreated?: true
    activeCountdowns?: true
    monthlyViews?: true
    totalViews?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    updatedAt?: true
    _all?: true
  }

  export type UsageStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageStats to aggregate.
     */
    where?: UsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageStats to fetch.
     */
    orderBy?: UsageStatsOrderByWithRelationInput | UsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageStats
    **/
    _count?: true | UsageStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageStatsMaxAggregateInputType
  }

  export type GetUsageStatsAggregateType<T extends UsageStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageStats[P]>
      : GetScalarType<T[P], AggregateUsageStats[P]>
  }




  export type UsageStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageStatsWhereInput
    orderBy?: UsageStatsOrderByWithAggregationInput | UsageStatsOrderByWithAggregationInput[]
    by: UsageStatsScalarFieldEnum[] | UsageStatsScalarFieldEnum
    having?: UsageStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageStatsCountAggregateInputType | true
    _avg?: UsageStatsAvgAggregateInputType
    _sum?: UsageStatsSumAggregateInputType
    _min?: UsageStatsMinAggregateInputType
    _max?: UsageStatsMaxAggregateInputType
  }

  export type UsageStatsGroupByOutputType = {
    id: string
    userId: string
    countdownsCreated: number
    activeCountdowns: number
    monthlyViews: number
    totalViews: number
    currentPeriodStart: Date
    currentPeriodEnd: Date
    updatedAt: Date
    _count: UsageStatsCountAggregateOutputType | null
    _avg: UsageStatsAvgAggregateOutputType | null
    _sum: UsageStatsSumAggregateOutputType | null
    _min: UsageStatsMinAggregateOutputType | null
    _max: UsageStatsMaxAggregateOutputType | null
  }

  type GetUsageStatsGroupByPayload<T extends UsageStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UsageStatsGroupByOutputType[P]>
        }
      >
    >


  export type UsageStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    countdownsCreated?: boolean
    activeCountdowns?: boolean
    monthlyViews?: boolean
    totalViews?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageStats"]>

  export type UsageStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    countdownsCreated?: boolean
    activeCountdowns?: boolean
    monthlyViews?: boolean
    totalViews?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageStats"]>

  export type UsageStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    countdownsCreated?: boolean
    activeCountdowns?: boolean
    monthlyViews?: boolean
    totalViews?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageStats"]>

  export type UsageStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    countdownsCreated?: boolean
    activeCountdowns?: boolean
    monthlyViews?: boolean
    totalViews?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    updatedAt?: boolean
  }

  export type UsageStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "countdownsCreated" | "activeCountdowns" | "monthlyViews" | "totalViews" | "currentPeriodStart" | "currentPeriodEnd" | "updatedAt", ExtArgs["result"]["usageStats"]>
  export type UsageStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsageStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsageStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UsageStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      countdownsCreated: number
      activeCountdowns: number
      monthlyViews: number
      totalViews: number
      currentPeriodStart: Date
      currentPeriodEnd: Date
      updatedAt: Date
    }, ExtArgs["result"]["usageStats"]>
    composites: {}
  }

  type UsageStatsGetPayload<S extends boolean | null | undefined | UsageStatsDefaultArgs> = $Result.GetResult<Prisma.$UsageStatsPayload, S>

  type UsageStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageStatsCountAggregateInputType | true
    }

  export interface UsageStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageStats'], meta: { name: 'UsageStats' } }
    /**
     * Find zero or one UsageStats that matches the filter.
     * @param {UsageStatsFindUniqueArgs} args - Arguments to find a UsageStats
     * @example
     * // Get one UsageStats
     * const usageStats = await prisma.usageStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageStatsFindUniqueArgs>(args: SelectSubset<T, UsageStatsFindUniqueArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageStatsFindUniqueOrThrowArgs} args - Arguments to find a UsageStats
     * @example
     * // Get one UsageStats
     * const usageStats = await prisma.usageStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageStatsFindFirstArgs} args - Arguments to find a UsageStats
     * @example
     * // Get one UsageStats
     * const usageStats = await prisma.usageStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageStatsFindFirstArgs>(args?: SelectSubset<T, UsageStatsFindFirstArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageStatsFindFirstOrThrowArgs} args - Arguments to find a UsageStats
     * @example
     * // Get one UsageStats
     * const usageStats = await prisma.usageStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageStats
     * const usageStats = await prisma.usageStats.findMany()
     * 
     * // Get first 10 UsageStats
     * const usageStats = await prisma.usageStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageStatsWithIdOnly = await prisma.usageStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageStatsFindManyArgs>(args?: SelectSubset<T, UsageStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageStats.
     * @param {UsageStatsCreateArgs} args - Arguments to create a UsageStats.
     * @example
     * // Create one UsageStats
     * const UsageStats = await prisma.usageStats.create({
     *   data: {
     *     // ... data to create a UsageStats
     *   }
     * })
     * 
     */
    create<T extends UsageStatsCreateArgs>(args: SelectSubset<T, UsageStatsCreateArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageStats.
     * @param {UsageStatsCreateManyArgs} args - Arguments to create many UsageStats.
     * @example
     * // Create many UsageStats
     * const usageStats = await prisma.usageStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageStatsCreateManyArgs>(args?: SelectSubset<T, UsageStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageStats and returns the data saved in the database.
     * @param {UsageStatsCreateManyAndReturnArgs} args - Arguments to create many UsageStats.
     * @example
     * // Create many UsageStats
     * const usageStats = await prisma.usageStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageStats and only return the `id`
     * const usageStatsWithIdOnly = await prisma.usageStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageStats.
     * @param {UsageStatsDeleteArgs} args - Arguments to delete one UsageStats.
     * @example
     * // Delete one UsageStats
     * const UsageStats = await prisma.usageStats.delete({
     *   where: {
     *     // ... filter to delete one UsageStats
     *   }
     * })
     * 
     */
    delete<T extends UsageStatsDeleteArgs>(args: SelectSubset<T, UsageStatsDeleteArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageStats.
     * @param {UsageStatsUpdateArgs} args - Arguments to update one UsageStats.
     * @example
     * // Update one UsageStats
     * const usageStats = await prisma.usageStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageStatsUpdateArgs>(args: SelectSubset<T, UsageStatsUpdateArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageStats.
     * @param {UsageStatsDeleteManyArgs} args - Arguments to filter UsageStats to delete.
     * @example
     * // Delete a few UsageStats
     * const { count } = await prisma.usageStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageStatsDeleteManyArgs>(args?: SelectSubset<T, UsageStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageStats
     * const usageStats = await prisma.usageStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageStatsUpdateManyArgs>(args: SelectSubset<T, UsageStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageStats and returns the data updated in the database.
     * @param {UsageStatsUpdateManyAndReturnArgs} args - Arguments to update many UsageStats.
     * @example
     * // Update many UsageStats
     * const usageStats = await prisma.usageStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageStats and only return the `id`
     * const usageStatsWithIdOnly = await prisma.usageStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageStats.
     * @param {UsageStatsUpsertArgs} args - Arguments to update or create a UsageStats.
     * @example
     * // Update or create a UsageStats
     * const usageStats = await prisma.usageStats.upsert({
     *   create: {
     *     // ... data to create a UsageStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageStats we want to update
     *   }
     * })
     */
    upsert<T extends UsageStatsUpsertArgs>(args: SelectSubset<T, UsageStatsUpsertArgs<ExtArgs>>): Prisma__UsageStatsClient<$Result.GetResult<Prisma.$UsageStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageStatsCountArgs} args - Arguments to filter UsageStats to count.
     * @example
     * // Count the number of UsageStats
     * const count = await prisma.usageStats.count({
     *   where: {
     *     // ... the filter for the UsageStats we want to count
     *   }
     * })
    **/
    count<T extends UsageStatsCountArgs>(
      args?: Subset<T, UsageStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageStatsAggregateArgs>(args: Subset<T, UsageStatsAggregateArgs>): Prisma.PrismaPromise<GetUsageStatsAggregateType<T>>

    /**
     * Group by UsageStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageStatsGroupByArgs['orderBy'] }
        : { orderBy?: UsageStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageStats model
   */
  readonly fields: UsageStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageStats model
   */
  interface UsageStatsFieldRefs {
    readonly id: FieldRef<"UsageStats", 'String'>
    readonly userId: FieldRef<"UsageStats", 'String'>
    readonly countdownsCreated: FieldRef<"UsageStats", 'Int'>
    readonly activeCountdowns: FieldRef<"UsageStats", 'Int'>
    readonly monthlyViews: FieldRef<"UsageStats", 'Int'>
    readonly totalViews: FieldRef<"UsageStats", 'Int'>
    readonly currentPeriodStart: FieldRef<"UsageStats", 'DateTime'>
    readonly currentPeriodEnd: FieldRef<"UsageStats", 'DateTime'>
    readonly updatedAt: FieldRef<"UsageStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageStats findUnique
   */
  export type UsageStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * Filter, which UsageStats to fetch.
     */
    where: UsageStatsWhereUniqueInput
  }

  /**
   * UsageStats findUniqueOrThrow
   */
  export type UsageStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * Filter, which UsageStats to fetch.
     */
    where: UsageStatsWhereUniqueInput
  }

  /**
   * UsageStats findFirst
   */
  export type UsageStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * Filter, which UsageStats to fetch.
     */
    where?: UsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageStats to fetch.
     */
    orderBy?: UsageStatsOrderByWithRelationInput | UsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageStats.
     */
    cursor?: UsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageStats.
     */
    distinct?: UsageStatsScalarFieldEnum | UsageStatsScalarFieldEnum[]
  }

  /**
   * UsageStats findFirstOrThrow
   */
  export type UsageStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * Filter, which UsageStats to fetch.
     */
    where?: UsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageStats to fetch.
     */
    orderBy?: UsageStatsOrderByWithRelationInput | UsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageStats.
     */
    cursor?: UsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageStats.
     */
    distinct?: UsageStatsScalarFieldEnum | UsageStatsScalarFieldEnum[]
  }

  /**
   * UsageStats findMany
   */
  export type UsageStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * Filter, which UsageStats to fetch.
     */
    where?: UsageStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageStats to fetch.
     */
    orderBy?: UsageStatsOrderByWithRelationInput | UsageStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageStats.
     */
    cursor?: UsageStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageStats.
     */
    skip?: number
    distinct?: UsageStatsScalarFieldEnum | UsageStatsScalarFieldEnum[]
  }

  /**
   * UsageStats create
   */
  export type UsageStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageStats.
     */
    data: XOR<UsageStatsCreateInput, UsageStatsUncheckedCreateInput>
  }

  /**
   * UsageStats createMany
   */
  export type UsageStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageStats.
     */
    data: UsageStatsCreateManyInput | UsageStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageStats createManyAndReturn
   */
  export type UsageStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * The data used to create many UsageStats.
     */
    data: UsageStatsCreateManyInput | UsageStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageStats update
   */
  export type UsageStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageStats.
     */
    data: XOR<UsageStatsUpdateInput, UsageStatsUncheckedUpdateInput>
    /**
     * Choose, which UsageStats to update.
     */
    where: UsageStatsWhereUniqueInput
  }

  /**
   * UsageStats updateMany
   */
  export type UsageStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageStats.
     */
    data: XOR<UsageStatsUpdateManyMutationInput, UsageStatsUncheckedUpdateManyInput>
    /**
     * Filter which UsageStats to update
     */
    where?: UsageStatsWhereInput
    /**
     * Limit how many UsageStats to update.
     */
    limit?: number
  }

  /**
   * UsageStats updateManyAndReturn
   */
  export type UsageStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * The data used to update UsageStats.
     */
    data: XOR<UsageStatsUpdateManyMutationInput, UsageStatsUncheckedUpdateManyInput>
    /**
     * Filter which UsageStats to update
     */
    where?: UsageStatsWhereInput
    /**
     * Limit how many UsageStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageStats upsert
   */
  export type UsageStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageStats to update in case it exists.
     */
    where: UsageStatsWhereUniqueInput
    /**
     * In case the UsageStats found by the `where` argument doesn't exist, create a new UsageStats with this data.
     */
    create: XOR<UsageStatsCreateInput, UsageStatsUncheckedCreateInput>
    /**
     * In case the UsageStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageStatsUpdateInput, UsageStatsUncheckedUpdateInput>
  }

  /**
   * UsageStats delete
   */
  export type UsageStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
    /**
     * Filter which UsageStats to delete.
     */
    where: UsageStatsWhereUniqueInput
  }

  /**
   * UsageStats deleteMany
   */
  export type UsageStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageStats to delete
     */
    where?: UsageStatsWhereInput
    /**
     * Limit how many UsageStats to delete.
     */
    limit?: number
  }

  /**
   * UsageStats without action
   */
  export type UsageStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageStats
     */
    select?: UsageStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageStats
     */
    omit?: UsageStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageStatsInclude<ExtArgs> | null
  }


  /**
   * Model Countdown
   */

  export type AggregateCountdown = {
    _count: CountdownCountAggregateOutputType | null
    _avg: CountdownAvgAggregateOutputType | null
    _sum: CountdownSumAggregateOutputType | null
    _min: CountdownMinAggregateOutputType | null
    _max: CountdownMaxAggregateOutputType | null
  }

  export type CountdownAvgAggregateOutputType = {
    viewCount: number | null
  }

  export type CountdownSumAggregateOutputType = {
    viewCount: number | null
  }

  export type CountdownMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    title: string | null
    endAt: Date | null
    timezone: string | null
    status: $Enums.CountdownStatus | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountdownMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    title: string | null
    endAt: Date | null
    timezone: string | null
    status: $Enums.CountdownStatus | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountdownCountAggregateOutputType = {
    id: number
    ownerId: number
    title: number
    endAt: number
    timezone: number
    status: number
    styleConfig: number
    viewCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CountdownAvgAggregateInputType = {
    viewCount?: true
  }

  export type CountdownSumAggregateInputType = {
    viewCount?: true
  }

  export type CountdownMinAggregateInputType = {
    id?: true
    ownerId?: true
    title?: true
    endAt?: true
    timezone?: true
    status?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountdownMaxAggregateInputType = {
    id?: true
    ownerId?: true
    title?: true
    endAt?: true
    timezone?: true
    status?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountdownCountAggregateInputType = {
    id?: true
    ownerId?: true
    title?: true
    endAt?: true
    timezone?: true
    status?: true
    styleConfig?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CountdownAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countdown to aggregate.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Countdowns
    **/
    _count?: true | CountdownCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CountdownAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CountdownSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountdownMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountdownMaxAggregateInputType
  }

  export type GetCountdownAggregateType<T extends CountdownAggregateArgs> = {
        [P in keyof T & keyof AggregateCountdown]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountdown[P]>
      : GetScalarType<T[P], AggregateCountdown[P]>
  }




  export type CountdownGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountdownWhereInput
    orderBy?: CountdownOrderByWithAggregationInput | CountdownOrderByWithAggregationInput[]
    by: CountdownScalarFieldEnum[] | CountdownScalarFieldEnum
    having?: CountdownScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountdownCountAggregateInputType | true
    _avg?: CountdownAvgAggregateInputType
    _sum?: CountdownSumAggregateInputType
    _min?: CountdownMinAggregateInputType
    _max?: CountdownMaxAggregateInputType
  }

  export type CountdownGroupByOutputType = {
    id: string
    ownerId: string
    title: string
    endAt: Date
    timezone: string
    status: $Enums.CountdownStatus
    styleConfig: JsonValue
    viewCount: number
    createdAt: Date
    updatedAt: Date
    _count: CountdownCountAggregateOutputType | null
    _avg: CountdownAvgAggregateOutputType | null
    _sum: CountdownSumAggregateOutputType | null
    _min: CountdownMinAggregateOutputType | null
    _max: CountdownMaxAggregateOutputType | null
  }

  type GetCountdownGroupByPayload<T extends CountdownGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountdownGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountdownGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountdownGroupByOutputType[P]>
            : GetScalarType<T[P], CountdownGroupByOutputType[P]>
        }
      >
    >


  export type CountdownSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    endAt?: boolean
    timezone?: boolean
    status?: boolean
    styleConfig?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["countdown"]>

  export type CountdownSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    endAt?: boolean
    timezone?: boolean
    status?: boolean
    styleConfig?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["countdown"]>

  export type CountdownSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    title?: boolean
    endAt?: boolean
    timezone?: boolean
    status?: boolean
    styleConfig?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["countdown"]>

  export type CountdownSelectScalar = {
    id?: boolean
    ownerId?: boolean
    title?: boolean
    endAt?: boolean
    timezone?: boolean
    status?: boolean
    styleConfig?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CountdownOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "title" | "endAt" | "timezone" | "status" | "styleConfig" | "viewCount" | "createdAt" | "updatedAt", ExtArgs["result"]["countdown"]>
  export type CountdownInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CountdownIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CountdownIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CountdownPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Countdown"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      title: string
      endAt: Date
      timezone: string
      status: $Enums.CountdownStatus
      styleConfig: Prisma.JsonValue
      viewCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["countdown"]>
    composites: {}
  }

  type CountdownGetPayload<S extends boolean | null | undefined | CountdownDefaultArgs> = $Result.GetResult<Prisma.$CountdownPayload, S>

  type CountdownCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountdownFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountdownCountAggregateInputType | true
    }

  export interface CountdownDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Countdown'], meta: { name: 'Countdown' } }
    /**
     * Find zero or one Countdown that matches the filter.
     * @param {CountdownFindUniqueArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountdownFindUniqueArgs>(args: SelectSubset<T, CountdownFindUniqueArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Countdown that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountdownFindUniqueOrThrowArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountdownFindUniqueOrThrowArgs>(args: SelectSubset<T, CountdownFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Countdown that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownFindFirstArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountdownFindFirstArgs>(args?: SelectSubset<T, CountdownFindFirstArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Countdown that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownFindFirstOrThrowArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountdownFindFirstOrThrowArgs>(args?: SelectSubset<T, CountdownFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Countdowns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countdowns
     * const countdowns = await prisma.countdown.findMany()
     * 
     * // Get first 10 Countdowns
     * const countdowns = await prisma.countdown.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const countdownWithIdOnly = await prisma.countdown.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CountdownFindManyArgs>(args?: SelectSubset<T, CountdownFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Countdown.
     * @param {CountdownCreateArgs} args - Arguments to create a Countdown.
     * @example
     * // Create one Countdown
     * const Countdown = await prisma.countdown.create({
     *   data: {
     *     // ... data to create a Countdown
     *   }
     * })
     * 
     */
    create<T extends CountdownCreateArgs>(args: SelectSubset<T, CountdownCreateArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Countdowns.
     * @param {CountdownCreateManyArgs} args - Arguments to create many Countdowns.
     * @example
     * // Create many Countdowns
     * const countdown = await prisma.countdown.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountdownCreateManyArgs>(args?: SelectSubset<T, CountdownCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Countdowns and returns the data saved in the database.
     * @param {CountdownCreateManyAndReturnArgs} args - Arguments to create many Countdowns.
     * @example
     * // Create many Countdowns
     * const countdown = await prisma.countdown.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Countdowns and only return the `id`
     * const countdownWithIdOnly = await prisma.countdown.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CountdownCreateManyAndReturnArgs>(args?: SelectSubset<T, CountdownCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Countdown.
     * @param {CountdownDeleteArgs} args - Arguments to delete one Countdown.
     * @example
     * // Delete one Countdown
     * const Countdown = await prisma.countdown.delete({
     *   where: {
     *     // ... filter to delete one Countdown
     *   }
     * })
     * 
     */
    delete<T extends CountdownDeleteArgs>(args: SelectSubset<T, CountdownDeleteArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Countdown.
     * @param {CountdownUpdateArgs} args - Arguments to update one Countdown.
     * @example
     * // Update one Countdown
     * const countdown = await prisma.countdown.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountdownUpdateArgs>(args: SelectSubset<T, CountdownUpdateArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Countdowns.
     * @param {CountdownDeleteManyArgs} args - Arguments to filter Countdowns to delete.
     * @example
     * // Delete a few Countdowns
     * const { count } = await prisma.countdown.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountdownDeleteManyArgs>(args?: SelectSubset<T, CountdownDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countdowns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countdowns
     * const countdown = await prisma.countdown.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountdownUpdateManyArgs>(args: SelectSubset<T, CountdownUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countdowns and returns the data updated in the database.
     * @param {CountdownUpdateManyAndReturnArgs} args - Arguments to update many Countdowns.
     * @example
     * // Update many Countdowns
     * const countdown = await prisma.countdown.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Countdowns and only return the `id`
     * const countdownWithIdOnly = await prisma.countdown.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CountdownUpdateManyAndReturnArgs>(args: SelectSubset<T, CountdownUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Countdown.
     * @param {CountdownUpsertArgs} args - Arguments to update or create a Countdown.
     * @example
     * // Update or create a Countdown
     * const countdown = await prisma.countdown.upsert({
     *   create: {
     *     // ... data to create a Countdown
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Countdown we want to update
     *   }
     * })
     */
    upsert<T extends CountdownUpsertArgs>(args: SelectSubset<T, CountdownUpsertArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Countdowns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownCountArgs} args - Arguments to filter Countdowns to count.
     * @example
     * // Count the number of Countdowns
     * const count = await prisma.countdown.count({
     *   where: {
     *     // ... the filter for the Countdowns we want to count
     *   }
     * })
    **/
    count<T extends CountdownCountArgs>(
      args?: Subset<T, CountdownCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountdownCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Countdown.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountdownAggregateArgs>(args: Subset<T, CountdownAggregateArgs>): Prisma.PrismaPromise<GetCountdownAggregateType<T>>

    /**
     * Group by Countdown.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountdownGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountdownGroupByArgs['orderBy'] }
        : { orderBy?: CountdownGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountdownGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountdownGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Countdown model
   */
  readonly fields: CountdownFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Countdown.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountdownClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Countdown model
   */
  interface CountdownFieldRefs {
    readonly id: FieldRef<"Countdown", 'String'>
    readonly ownerId: FieldRef<"Countdown", 'String'>
    readonly title: FieldRef<"Countdown", 'String'>
    readonly endAt: FieldRef<"Countdown", 'DateTime'>
    readonly timezone: FieldRef<"Countdown", 'String'>
    readonly status: FieldRef<"Countdown", 'CountdownStatus'>
    readonly styleConfig: FieldRef<"Countdown", 'Json'>
    readonly viewCount: FieldRef<"Countdown", 'Int'>
    readonly createdAt: FieldRef<"Countdown", 'DateTime'>
    readonly updatedAt: FieldRef<"Countdown", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Countdown findUnique
   */
  export type CountdownFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown findUniqueOrThrow
   */
  export type CountdownFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown findFirst
   */
  export type CountdownFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countdowns.
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countdowns.
     */
    distinct?: CountdownScalarFieldEnum | CountdownScalarFieldEnum[]
  }

  /**
   * Countdown findFirstOrThrow
   */
  export type CountdownFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countdowns.
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countdowns.
     */
    distinct?: CountdownScalarFieldEnum | CountdownScalarFieldEnum[]
  }

  /**
   * Countdown findMany
   */
  export type CountdownFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * Filter, which Countdowns to fetch.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Countdowns.
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    distinct?: CountdownScalarFieldEnum | CountdownScalarFieldEnum[]
  }

  /**
   * Countdown create
   */
  export type CountdownCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * The data needed to create a Countdown.
     */
    data: XOR<CountdownCreateInput, CountdownUncheckedCreateInput>
  }

  /**
   * Countdown createMany
   */
  export type CountdownCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Countdowns.
     */
    data: CountdownCreateManyInput | CountdownCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Countdown createManyAndReturn
   */
  export type CountdownCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * The data used to create many Countdowns.
     */
    data: CountdownCreateManyInput | CountdownCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Countdown update
   */
  export type CountdownUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * The data needed to update a Countdown.
     */
    data: XOR<CountdownUpdateInput, CountdownUncheckedUpdateInput>
    /**
     * Choose, which Countdown to update.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown updateMany
   */
  export type CountdownUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Countdowns.
     */
    data: XOR<CountdownUpdateManyMutationInput, CountdownUncheckedUpdateManyInput>
    /**
     * Filter which Countdowns to update
     */
    where?: CountdownWhereInput
    /**
     * Limit how many Countdowns to update.
     */
    limit?: number
  }

  /**
   * Countdown updateManyAndReturn
   */
  export type CountdownUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * The data used to update Countdowns.
     */
    data: XOR<CountdownUpdateManyMutationInput, CountdownUncheckedUpdateManyInput>
    /**
     * Filter which Countdowns to update
     */
    where?: CountdownWhereInput
    /**
     * Limit how many Countdowns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Countdown upsert
   */
  export type CountdownUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * The filter to search for the Countdown to update in case it exists.
     */
    where: CountdownWhereUniqueInput
    /**
     * In case the Countdown found by the `where` argument doesn't exist, create a new Countdown with this data.
     */
    create: XOR<CountdownCreateInput, CountdownUncheckedCreateInput>
    /**
     * In case the Countdown was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountdownUpdateInput, CountdownUncheckedUpdateInput>
  }

  /**
   * Countdown delete
   */
  export type CountdownDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
    /**
     * Filter which Countdown to delete.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown deleteMany
   */
  export type CountdownDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countdowns to delete
     */
    where?: CountdownWhereInput
    /**
     * Limit how many Countdowns to delete.
     */
    limit?: number
  }

  /**
   * Countdown without action
   */
  export type CountdownDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountdownInclude<ExtArgs> | null
  }


  /**
   * Model UsageMonth
   */

  export type AggregateUsageMonth = {
    _count: UsageMonthCountAggregateOutputType | null
    _avg: UsageMonthAvgAggregateOutputType | null
    _sum: UsageMonthSumAggregateOutputType | null
    _min: UsageMonthMinAggregateOutputType | null
    _max: UsageMonthMaxAggregateOutputType | null
  }

  export type UsageMonthAvgAggregateOutputType = {
    year: number | null
    month: number | null
    viewsUsed: number | null
    viewsLimit: number | null
  }

  export type UsageMonthSumAggregateOutputType = {
    year: number | null
    month: number | null
    viewsUsed: number | null
    viewsLimit: number | null
  }

  export type UsageMonthMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    viewsUsed: number | null
    viewsLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsageMonthMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    viewsUsed: number | null
    viewsLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsageMonthCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    month: number
    viewsUsed: number
    viewsLimit: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsageMonthAvgAggregateInputType = {
    year?: true
    month?: true
    viewsUsed?: true
    viewsLimit?: true
  }

  export type UsageMonthSumAggregateInputType = {
    year?: true
    month?: true
    viewsUsed?: true
    viewsLimit?: true
  }

  export type UsageMonthMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    viewsUsed?: true
    viewsLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsageMonthMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    viewsUsed?: true
    viewsLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsageMonthCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    viewsUsed?: true
    viewsLimit?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsageMonthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageMonth to aggregate.
     */
    where?: UsageMonthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMonths to fetch.
     */
    orderBy?: UsageMonthOrderByWithRelationInput | UsageMonthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageMonthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMonths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMonths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageMonths
    **/
    _count?: true | UsageMonthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageMonthAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageMonthSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageMonthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageMonthMaxAggregateInputType
  }

  export type GetUsageMonthAggregateType<T extends UsageMonthAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageMonth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageMonth[P]>
      : GetScalarType<T[P], AggregateUsageMonth[P]>
  }




  export type UsageMonthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageMonthWhereInput
    orderBy?: UsageMonthOrderByWithAggregationInput | UsageMonthOrderByWithAggregationInput[]
    by: UsageMonthScalarFieldEnum[] | UsageMonthScalarFieldEnum
    having?: UsageMonthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageMonthCountAggregateInputType | true
    _avg?: UsageMonthAvgAggregateInputType
    _sum?: UsageMonthSumAggregateInputType
    _min?: UsageMonthMinAggregateInputType
    _max?: UsageMonthMaxAggregateInputType
  }

  export type UsageMonthGroupByOutputType = {
    id: string
    userId: string
    year: number
    month: number
    viewsUsed: number
    viewsLimit: number
    createdAt: Date
    updatedAt: Date
    _count: UsageMonthCountAggregateOutputType | null
    _avg: UsageMonthAvgAggregateOutputType | null
    _sum: UsageMonthSumAggregateOutputType | null
    _min: UsageMonthMinAggregateOutputType | null
    _max: UsageMonthMaxAggregateOutputType | null
  }

  type GetUsageMonthGroupByPayload<T extends UsageMonthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageMonthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageMonthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageMonthGroupByOutputType[P]>
            : GetScalarType<T[P], UsageMonthGroupByOutputType[P]>
        }
      >
    >


  export type UsageMonthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    viewsUsed?: boolean
    viewsLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageMonth"]>

  export type UsageMonthSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    viewsUsed?: boolean
    viewsLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageMonth"]>

  export type UsageMonthSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    viewsUsed?: boolean
    viewsLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageMonth"]>

  export type UsageMonthSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    viewsUsed?: boolean
    viewsLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsageMonthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "month" | "viewsUsed" | "viewsLimit" | "createdAt" | "updatedAt", ExtArgs["result"]["usageMonth"]>
  export type UsageMonthInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsageMonthIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsageMonthIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UsageMonthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageMonth"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      month: number
      viewsUsed: number
      viewsLimit: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usageMonth"]>
    composites: {}
  }

  type UsageMonthGetPayload<S extends boolean | null | undefined | UsageMonthDefaultArgs> = $Result.GetResult<Prisma.$UsageMonthPayload, S>

  type UsageMonthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageMonthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageMonthCountAggregateInputType | true
    }

  export interface UsageMonthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageMonth'], meta: { name: 'UsageMonth' } }
    /**
     * Find zero or one UsageMonth that matches the filter.
     * @param {UsageMonthFindUniqueArgs} args - Arguments to find a UsageMonth
     * @example
     * // Get one UsageMonth
     * const usageMonth = await prisma.usageMonth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageMonthFindUniqueArgs>(args: SelectSubset<T, UsageMonthFindUniqueArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageMonth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageMonthFindUniqueOrThrowArgs} args - Arguments to find a UsageMonth
     * @example
     * // Get one UsageMonth
     * const usageMonth = await prisma.usageMonth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageMonthFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageMonthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageMonth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMonthFindFirstArgs} args - Arguments to find a UsageMonth
     * @example
     * // Get one UsageMonth
     * const usageMonth = await prisma.usageMonth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageMonthFindFirstArgs>(args?: SelectSubset<T, UsageMonthFindFirstArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageMonth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMonthFindFirstOrThrowArgs} args - Arguments to find a UsageMonth
     * @example
     * // Get one UsageMonth
     * const usageMonth = await prisma.usageMonth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageMonthFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageMonthFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageMonths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMonthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageMonths
     * const usageMonths = await prisma.usageMonth.findMany()
     * 
     * // Get first 10 UsageMonths
     * const usageMonths = await prisma.usageMonth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageMonthWithIdOnly = await prisma.usageMonth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageMonthFindManyArgs>(args?: SelectSubset<T, UsageMonthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageMonth.
     * @param {UsageMonthCreateArgs} args - Arguments to create a UsageMonth.
     * @example
     * // Create one UsageMonth
     * const UsageMonth = await prisma.usageMonth.create({
     *   data: {
     *     // ... data to create a UsageMonth
     *   }
     * })
     * 
     */
    create<T extends UsageMonthCreateArgs>(args: SelectSubset<T, UsageMonthCreateArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageMonths.
     * @param {UsageMonthCreateManyArgs} args - Arguments to create many UsageMonths.
     * @example
     * // Create many UsageMonths
     * const usageMonth = await prisma.usageMonth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageMonthCreateManyArgs>(args?: SelectSubset<T, UsageMonthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageMonths and returns the data saved in the database.
     * @param {UsageMonthCreateManyAndReturnArgs} args - Arguments to create many UsageMonths.
     * @example
     * // Create many UsageMonths
     * const usageMonth = await prisma.usageMonth.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageMonths and only return the `id`
     * const usageMonthWithIdOnly = await prisma.usageMonth.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageMonthCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageMonthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageMonth.
     * @param {UsageMonthDeleteArgs} args - Arguments to delete one UsageMonth.
     * @example
     * // Delete one UsageMonth
     * const UsageMonth = await prisma.usageMonth.delete({
     *   where: {
     *     // ... filter to delete one UsageMonth
     *   }
     * })
     * 
     */
    delete<T extends UsageMonthDeleteArgs>(args: SelectSubset<T, UsageMonthDeleteArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageMonth.
     * @param {UsageMonthUpdateArgs} args - Arguments to update one UsageMonth.
     * @example
     * // Update one UsageMonth
     * const usageMonth = await prisma.usageMonth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageMonthUpdateArgs>(args: SelectSubset<T, UsageMonthUpdateArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageMonths.
     * @param {UsageMonthDeleteManyArgs} args - Arguments to filter UsageMonths to delete.
     * @example
     * // Delete a few UsageMonths
     * const { count } = await prisma.usageMonth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageMonthDeleteManyArgs>(args?: SelectSubset<T, UsageMonthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageMonths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMonthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageMonths
     * const usageMonth = await prisma.usageMonth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageMonthUpdateManyArgs>(args: SelectSubset<T, UsageMonthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageMonths and returns the data updated in the database.
     * @param {UsageMonthUpdateManyAndReturnArgs} args - Arguments to update many UsageMonths.
     * @example
     * // Update many UsageMonths
     * const usageMonth = await prisma.usageMonth.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageMonths and only return the `id`
     * const usageMonthWithIdOnly = await prisma.usageMonth.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageMonthUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageMonthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageMonth.
     * @param {UsageMonthUpsertArgs} args - Arguments to update or create a UsageMonth.
     * @example
     * // Update or create a UsageMonth
     * const usageMonth = await prisma.usageMonth.upsert({
     *   create: {
     *     // ... data to create a UsageMonth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageMonth we want to update
     *   }
     * })
     */
    upsert<T extends UsageMonthUpsertArgs>(args: SelectSubset<T, UsageMonthUpsertArgs<ExtArgs>>): Prisma__UsageMonthClient<$Result.GetResult<Prisma.$UsageMonthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageMonths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMonthCountArgs} args - Arguments to filter UsageMonths to count.
     * @example
     * // Count the number of UsageMonths
     * const count = await prisma.usageMonth.count({
     *   where: {
     *     // ... the filter for the UsageMonths we want to count
     *   }
     * })
    **/
    count<T extends UsageMonthCountArgs>(
      args?: Subset<T, UsageMonthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageMonthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageMonth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMonthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageMonthAggregateArgs>(args: Subset<T, UsageMonthAggregateArgs>): Prisma.PrismaPromise<GetUsageMonthAggregateType<T>>

    /**
     * Group by UsageMonth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMonthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageMonthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageMonthGroupByArgs['orderBy'] }
        : { orderBy?: UsageMonthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageMonthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageMonthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageMonth model
   */
  readonly fields: UsageMonthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageMonth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageMonthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageMonth model
   */
  interface UsageMonthFieldRefs {
    readonly id: FieldRef<"UsageMonth", 'String'>
    readonly userId: FieldRef<"UsageMonth", 'String'>
    readonly year: FieldRef<"UsageMonth", 'Int'>
    readonly month: FieldRef<"UsageMonth", 'Int'>
    readonly viewsUsed: FieldRef<"UsageMonth", 'Int'>
    readonly viewsLimit: FieldRef<"UsageMonth", 'Int'>
    readonly createdAt: FieldRef<"UsageMonth", 'DateTime'>
    readonly updatedAt: FieldRef<"UsageMonth", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageMonth findUnique
   */
  export type UsageMonthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * Filter, which UsageMonth to fetch.
     */
    where: UsageMonthWhereUniqueInput
  }

  /**
   * UsageMonth findUniqueOrThrow
   */
  export type UsageMonthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * Filter, which UsageMonth to fetch.
     */
    where: UsageMonthWhereUniqueInput
  }

  /**
   * UsageMonth findFirst
   */
  export type UsageMonthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * Filter, which UsageMonth to fetch.
     */
    where?: UsageMonthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMonths to fetch.
     */
    orderBy?: UsageMonthOrderByWithRelationInput | UsageMonthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageMonths.
     */
    cursor?: UsageMonthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMonths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMonths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageMonths.
     */
    distinct?: UsageMonthScalarFieldEnum | UsageMonthScalarFieldEnum[]
  }

  /**
   * UsageMonth findFirstOrThrow
   */
  export type UsageMonthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * Filter, which UsageMonth to fetch.
     */
    where?: UsageMonthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMonths to fetch.
     */
    orderBy?: UsageMonthOrderByWithRelationInput | UsageMonthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageMonths.
     */
    cursor?: UsageMonthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMonths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMonths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageMonths.
     */
    distinct?: UsageMonthScalarFieldEnum | UsageMonthScalarFieldEnum[]
  }

  /**
   * UsageMonth findMany
   */
  export type UsageMonthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * Filter, which UsageMonths to fetch.
     */
    where?: UsageMonthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMonths to fetch.
     */
    orderBy?: UsageMonthOrderByWithRelationInput | UsageMonthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageMonths.
     */
    cursor?: UsageMonthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMonths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMonths.
     */
    skip?: number
    distinct?: UsageMonthScalarFieldEnum | UsageMonthScalarFieldEnum[]
  }

  /**
   * UsageMonth create
   */
  export type UsageMonthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageMonth.
     */
    data: XOR<UsageMonthCreateInput, UsageMonthUncheckedCreateInput>
  }

  /**
   * UsageMonth createMany
   */
  export type UsageMonthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageMonths.
     */
    data: UsageMonthCreateManyInput | UsageMonthCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageMonth createManyAndReturn
   */
  export type UsageMonthCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * The data used to create many UsageMonths.
     */
    data: UsageMonthCreateManyInput | UsageMonthCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageMonth update
   */
  export type UsageMonthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageMonth.
     */
    data: XOR<UsageMonthUpdateInput, UsageMonthUncheckedUpdateInput>
    /**
     * Choose, which UsageMonth to update.
     */
    where: UsageMonthWhereUniqueInput
  }

  /**
   * UsageMonth updateMany
   */
  export type UsageMonthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageMonths.
     */
    data: XOR<UsageMonthUpdateManyMutationInput, UsageMonthUncheckedUpdateManyInput>
    /**
     * Filter which UsageMonths to update
     */
    where?: UsageMonthWhereInput
    /**
     * Limit how many UsageMonths to update.
     */
    limit?: number
  }

  /**
   * UsageMonth updateManyAndReturn
   */
  export type UsageMonthUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * The data used to update UsageMonths.
     */
    data: XOR<UsageMonthUpdateManyMutationInput, UsageMonthUncheckedUpdateManyInput>
    /**
     * Filter which UsageMonths to update
     */
    where?: UsageMonthWhereInput
    /**
     * Limit how many UsageMonths to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageMonth upsert
   */
  export type UsageMonthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageMonth to update in case it exists.
     */
    where: UsageMonthWhereUniqueInput
    /**
     * In case the UsageMonth found by the `where` argument doesn't exist, create a new UsageMonth with this data.
     */
    create: XOR<UsageMonthCreateInput, UsageMonthUncheckedCreateInput>
    /**
     * In case the UsageMonth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageMonthUpdateInput, UsageMonthUncheckedUpdateInput>
  }

  /**
   * UsageMonth delete
   */
  export type UsageMonthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
    /**
     * Filter which UsageMonth to delete.
     */
    where: UsageMonthWhereUniqueInput
  }

  /**
   * UsageMonth deleteMany
   */
  export type UsageMonthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageMonths to delete
     */
    where?: UsageMonthWhereInput
    /**
     * Limit how many UsageMonths to delete.
     */
    limit?: number
  }

  /**
   * UsageMonth without action
   */
  export type UsageMonthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMonth
     */
    select?: UsageMonthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageMonth
     */
    omit?: UsageMonthOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageMonthInclude<ExtArgs> | null
  }


  /**
   * Model CustomFont
   */

  export type AggregateCustomFont = {
    _count: CustomFontCountAggregateOutputType | null
    _avg: CustomFontAvgAggregateOutputType | null
    _sum: CustomFontSumAggregateOutputType | null
    _min: CustomFontMinAggregateOutputType | null
    _max: CustomFontMaxAggregateOutputType | null
  }

  export type CustomFontAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type CustomFontSumAggregateOutputType = {
    fileSize: number | null
  }

  export type CustomFontMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    fileName: string | null
    storagePath: string | null
    fileSize: number | null
    mimeType: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFontMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    fileName: string | null
    storagePath: string | null
    fileSize: number | null
    mimeType: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomFontCountAggregateOutputType = {
    id: number
    ownerId: number
    name: number
    fileName: number
    storagePath: number
    fileSize: number
    mimeType: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomFontAvgAggregateInputType = {
    fileSize?: true
  }

  export type CustomFontSumAggregateInputType = {
    fileSize?: true
  }

  export type CustomFontMinAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    fileName?: true
    storagePath?: true
    fileSize?: true
    mimeType?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFontMaxAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    fileName?: true
    storagePath?: true
    fileSize?: true
    mimeType?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomFontCountAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    fileName?: true
    storagePath?: true
    fileSize?: true
    mimeType?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomFontAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFont to aggregate.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomFonts
    **/
    _count?: true | CustomFontCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomFontAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomFontSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomFontMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomFontMaxAggregateInputType
  }

  export type GetCustomFontAggregateType<T extends CustomFontAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomFont]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomFont[P]>
      : GetScalarType<T[P], AggregateCustomFont[P]>
  }




  export type CustomFontGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomFontWhereInput
    orderBy?: CustomFontOrderByWithAggregationInput | CustomFontOrderByWithAggregationInput[]
    by: CustomFontScalarFieldEnum[] | CustomFontScalarFieldEnum
    having?: CustomFontScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomFontCountAggregateInputType | true
    _avg?: CustomFontAvgAggregateInputType
    _sum?: CustomFontSumAggregateInputType
    _min?: CustomFontMinAggregateInputType
    _max?: CustomFontMaxAggregateInputType
  }

  export type CustomFontGroupByOutputType = {
    id: string
    ownerId: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CustomFontCountAggregateOutputType | null
    _avg: CustomFontAvgAggregateOutputType | null
    _sum: CustomFontSumAggregateOutputType | null
    _min: CustomFontMinAggregateOutputType | null
    _max: CustomFontMaxAggregateOutputType | null
  }

  type GetCustomFontGroupByPayload<T extends CustomFontGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomFontGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomFontGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomFontGroupByOutputType[P]>
            : GetScalarType<T[P], CustomFontGroupByOutputType[P]>
        }
      >
    >


  export type CustomFontSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customFont"]>

  export type CustomFontSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customFont"]>

  export type CustomFontSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customFont"]>

  export type CustomFontSelectScalar = {
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomFontOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "name" | "fileName" | "storagePath" | "fileSize" | "mimeType" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["customFont"]>
  export type CustomFontInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomFontIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomFontIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CustomFontPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomFont"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      name: string
      fileName: string
      storagePath: string
      fileSize: number
      mimeType: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customFont"]>
    composites: {}
  }

  type CustomFontGetPayload<S extends boolean | null | undefined | CustomFontDefaultArgs> = $Result.GetResult<Prisma.$CustomFontPayload, S>

  type CustomFontCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomFontFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomFontCountAggregateInputType | true
    }

  export interface CustomFontDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomFont'], meta: { name: 'CustomFont' } }
    /**
     * Find zero or one CustomFont that matches the filter.
     * @param {CustomFontFindUniqueArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomFontFindUniqueArgs>(args: SelectSubset<T, CustomFontFindUniqueArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomFont that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomFontFindUniqueOrThrowArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomFontFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomFontFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomFont that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontFindFirstArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomFontFindFirstArgs>(args?: SelectSubset<T, CustomFontFindFirstArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomFont that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontFindFirstOrThrowArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomFontFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomFontFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomFonts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomFonts
     * const customFonts = await prisma.customFont.findMany()
     * 
     * // Get first 10 CustomFonts
     * const customFonts = await prisma.customFont.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customFontWithIdOnly = await prisma.customFont.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomFontFindManyArgs>(args?: SelectSubset<T, CustomFontFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomFont.
     * @param {CustomFontCreateArgs} args - Arguments to create a CustomFont.
     * @example
     * // Create one CustomFont
     * const CustomFont = await prisma.customFont.create({
     *   data: {
     *     // ... data to create a CustomFont
     *   }
     * })
     * 
     */
    create<T extends CustomFontCreateArgs>(args: SelectSubset<T, CustomFontCreateArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomFonts.
     * @param {CustomFontCreateManyArgs} args - Arguments to create many CustomFonts.
     * @example
     * // Create many CustomFonts
     * const customFont = await prisma.customFont.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomFontCreateManyArgs>(args?: SelectSubset<T, CustomFontCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomFonts and returns the data saved in the database.
     * @param {CustomFontCreateManyAndReturnArgs} args - Arguments to create many CustomFonts.
     * @example
     * // Create many CustomFonts
     * const customFont = await prisma.customFont.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomFonts and only return the `id`
     * const customFontWithIdOnly = await prisma.customFont.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomFontCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomFontCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomFont.
     * @param {CustomFontDeleteArgs} args - Arguments to delete one CustomFont.
     * @example
     * // Delete one CustomFont
     * const CustomFont = await prisma.customFont.delete({
     *   where: {
     *     // ... filter to delete one CustomFont
     *   }
     * })
     * 
     */
    delete<T extends CustomFontDeleteArgs>(args: SelectSubset<T, CustomFontDeleteArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomFont.
     * @param {CustomFontUpdateArgs} args - Arguments to update one CustomFont.
     * @example
     * // Update one CustomFont
     * const customFont = await prisma.customFont.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomFontUpdateArgs>(args: SelectSubset<T, CustomFontUpdateArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomFonts.
     * @param {CustomFontDeleteManyArgs} args - Arguments to filter CustomFonts to delete.
     * @example
     * // Delete a few CustomFonts
     * const { count } = await prisma.customFont.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomFontDeleteManyArgs>(args?: SelectSubset<T, CustomFontDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFonts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomFonts
     * const customFont = await prisma.customFont.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomFontUpdateManyArgs>(args: SelectSubset<T, CustomFontUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFonts and returns the data updated in the database.
     * @param {CustomFontUpdateManyAndReturnArgs} args - Arguments to update many CustomFonts.
     * @example
     * // Update many CustomFonts
     * const customFont = await prisma.customFont.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomFonts and only return the `id`
     * const customFontWithIdOnly = await prisma.customFont.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomFontUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomFontUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomFont.
     * @param {CustomFontUpsertArgs} args - Arguments to update or create a CustomFont.
     * @example
     * // Update or create a CustomFont
     * const customFont = await prisma.customFont.upsert({
     *   create: {
     *     // ... data to create a CustomFont
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomFont we want to update
     *   }
     * })
     */
    upsert<T extends CustomFontUpsertArgs>(args: SelectSubset<T, CustomFontUpsertArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomFonts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontCountArgs} args - Arguments to filter CustomFonts to count.
     * @example
     * // Count the number of CustomFonts
     * const count = await prisma.customFont.count({
     *   where: {
     *     // ... the filter for the CustomFonts we want to count
     *   }
     * })
    **/
    count<T extends CustomFontCountArgs>(
      args?: Subset<T, CustomFontCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomFontCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomFont.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomFontAggregateArgs>(args: Subset<T, CustomFontAggregateArgs>): Prisma.PrismaPromise<GetCustomFontAggregateType<T>>

    /**
     * Group by CustomFont.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomFontGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomFontGroupByArgs['orderBy'] }
        : { orderBy?: CustomFontGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomFontGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomFontGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomFont model
   */
  readonly fields: CustomFontFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomFont.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomFontClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomFont model
   */
  interface CustomFontFieldRefs {
    readonly id: FieldRef<"CustomFont", 'String'>
    readonly ownerId: FieldRef<"CustomFont", 'String'>
    readonly name: FieldRef<"CustomFont", 'String'>
    readonly fileName: FieldRef<"CustomFont", 'String'>
    readonly storagePath: FieldRef<"CustomFont", 'String'>
    readonly fileSize: FieldRef<"CustomFont", 'Int'>
    readonly mimeType: FieldRef<"CustomFont", 'String'>
    readonly isActive: FieldRef<"CustomFont", 'Boolean'>
    readonly createdAt: FieldRef<"CustomFont", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomFont", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomFont findUnique
   */
  export type CustomFontFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont findUniqueOrThrow
   */
  export type CustomFontFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont findFirst
   */
  export type CustomFontFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFonts.
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFonts.
     */
    distinct?: CustomFontScalarFieldEnum | CustomFontScalarFieldEnum[]
  }

  /**
   * CustomFont findFirstOrThrow
   */
  export type CustomFontFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFonts.
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFonts.
     */
    distinct?: CustomFontScalarFieldEnum | CustomFontScalarFieldEnum[]
  }

  /**
   * CustomFont findMany
   */
  export type CustomFontFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * Filter, which CustomFonts to fetch.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomFonts.
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    distinct?: CustomFontScalarFieldEnum | CustomFontScalarFieldEnum[]
  }

  /**
   * CustomFont create
   */
  export type CustomFontCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomFont.
     */
    data: XOR<CustomFontCreateInput, CustomFontUncheckedCreateInput>
  }

  /**
   * CustomFont createMany
   */
  export type CustomFontCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomFonts.
     */
    data: CustomFontCreateManyInput | CustomFontCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomFont createManyAndReturn
   */
  export type CustomFontCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * The data used to create many CustomFonts.
     */
    data: CustomFontCreateManyInput | CustomFontCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomFont update
   */
  export type CustomFontUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomFont.
     */
    data: XOR<CustomFontUpdateInput, CustomFontUncheckedUpdateInput>
    /**
     * Choose, which CustomFont to update.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont updateMany
   */
  export type CustomFontUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomFonts.
     */
    data: XOR<CustomFontUpdateManyMutationInput, CustomFontUncheckedUpdateManyInput>
    /**
     * Filter which CustomFonts to update
     */
    where?: CustomFontWhereInput
    /**
     * Limit how many CustomFonts to update.
     */
    limit?: number
  }

  /**
   * CustomFont updateManyAndReturn
   */
  export type CustomFontUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * The data used to update CustomFonts.
     */
    data: XOR<CustomFontUpdateManyMutationInput, CustomFontUncheckedUpdateManyInput>
    /**
     * Filter which CustomFonts to update
     */
    where?: CustomFontWhereInput
    /**
     * Limit how many CustomFonts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomFont upsert
   */
  export type CustomFontUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomFont to update in case it exists.
     */
    where: CustomFontWhereUniqueInput
    /**
     * In case the CustomFont found by the `where` argument doesn't exist, create a new CustomFont with this data.
     */
    create: XOR<CustomFontCreateInput, CustomFontUncheckedCreateInput>
    /**
     * In case the CustomFont was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomFontUpdateInput, CustomFontUncheckedUpdateInput>
  }

  /**
   * CustomFont delete
   */
  export type CustomFontDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
    /**
     * Filter which CustomFont to delete.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont deleteMany
   */
  export type CustomFontDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFonts to delete
     */
    where?: CustomFontWhereInput
    /**
     * Limit how many CustomFonts to delete.
     */
    limit?: number
  }

  /**
   * CustomFont without action
   */
  export type CustomFontDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomFontInclude<ExtArgs> | null
  }


  /**
   * Model BackgroundImage
   */

  export type AggregateBackgroundImage = {
    _count: BackgroundImageCountAggregateOutputType | null
    _avg: BackgroundImageAvgAggregateOutputType | null
    _sum: BackgroundImageSumAggregateOutputType | null
    _min: BackgroundImageMinAggregateOutputType | null
    _max: BackgroundImageMaxAggregateOutputType | null
  }

  export type BackgroundImageAvgAggregateOutputType = {
    fileSize: number | null
    width: number | null
    height: number | null
  }

  export type BackgroundImageSumAggregateOutputType = {
    fileSize: number | null
    width: number | null
    height: number | null
  }

  export type BackgroundImageMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    fileName: string | null
    storagePath: string | null
    fileSize: number | null
    mimeType: string | null
    width: number | null
    height: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BackgroundImageMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    fileName: string | null
    storagePath: string | null
    fileSize: number | null
    mimeType: string | null
    width: number | null
    height: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BackgroundImageCountAggregateOutputType = {
    id: number
    ownerId: number
    name: number
    fileName: number
    storagePath: number
    fileSize: number
    mimeType: number
    width: number
    height: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BackgroundImageAvgAggregateInputType = {
    fileSize?: true
    width?: true
    height?: true
  }

  export type BackgroundImageSumAggregateInputType = {
    fileSize?: true
    width?: true
    height?: true
  }

  export type BackgroundImageMinAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    fileName?: true
    storagePath?: true
    fileSize?: true
    mimeType?: true
    width?: true
    height?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BackgroundImageMaxAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    fileName?: true
    storagePath?: true
    fileSize?: true
    mimeType?: true
    width?: true
    height?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BackgroundImageCountAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    fileName?: true
    storagePath?: true
    fileSize?: true
    mimeType?: true
    width?: true
    height?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BackgroundImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackgroundImage to aggregate.
     */
    where?: BackgroundImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundImages to fetch.
     */
    orderBy?: BackgroundImageOrderByWithRelationInput | BackgroundImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BackgroundImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BackgroundImages
    **/
    _count?: true | BackgroundImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BackgroundImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BackgroundImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BackgroundImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BackgroundImageMaxAggregateInputType
  }

  export type GetBackgroundImageAggregateType<T extends BackgroundImageAggregateArgs> = {
        [P in keyof T & keyof AggregateBackgroundImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackgroundImage[P]>
      : GetScalarType<T[P], AggregateBackgroundImage[P]>
  }




  export type BackgroundImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackgroundImageWhereInput
    orderBy?: BackgroundImageOrderByWithAggregationInput | BackgroundImageOrderByWithAggregationInput[]
    by: BackgroundImageScalarFieldEnum[] | BackgroundImageScalarFieldEnum
    having?: BackgroundImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BackgroundImageCountAggregateInputType | true
    _avg?: BackgroundImageAvgAggregateInputType
    _sum?: BackgroundImageSumAggregateInputType
    _min?: BackgroundImageMinAggregateInputType
    _max?: BackgroundImageMaxAggregateInputType
  }

  export type BackgroundImageGroupByOutputType = {
    id: string
    ownerId: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    width: number
    height: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: BackgroundImageCountAggregateOutputType | null
    _avg: BackgroundImageAvgAggregateOutputType | null
    _sum: BackgroundImageSumAggregateOutputType | null
    _min: BackgroundImageMinAggregateOutputType | null
    _max: BackgroundImageMaxAggregateOutputType | null
  }

  type GetBackgroundImageGroupByPayload<T extends BackgroundImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BackgroundImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BackgroundImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BackgroundImageGroupByOutputType[P]>
            : GetScalarType<T[P], BackgroundImageGroupByOutputType[P]>
        }
      >
    >


  export type BackgroundImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    width?: boolean
    height?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backgroundImage"]>

  export type BackgroundImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    width?: boolean
    height?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backgroundImage"]>

  export type BackgroundImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    width?: boolean
    height?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backgroundImage"]>

  export type BackgroundImageSelectScalar = {
    id?: boolean
    ownerId?: boolean
    name?: boolean
    fileName?: boolean
    storagePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    width?: boolean
    height?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BackgroundImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "name" | "fileName" | "storagePath" | "fileSize" | "mimeType" | "width" | "height" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["backgroundImage"]>
  export type BackgroundImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BackgroundImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BackgroundImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BackgroundImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BackgroundImage"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      name: string
      fileName: string
      storagePath: string
      fileSize: number
      mimeType: string
      width: number
      height: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["backgroundImage"]>
    composites: {}
  }

  type BackgroundImageGetPayload<S extends boolean | null | undefined | BackgroundImageDefaultArgs> = $Result.GetResult<Prisma.$BackgroundImagePayload, S>

  type BackgroundImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BackgroundImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BackgroundImageCountAggregateInputType | true
    }

  export interface BackgroundImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BackgroundImage'], meta: { name: 'BackgroundImage' } }
    /**
     * Find zero or one BackgroundImage that matches the filter.
     * @param {BackgroundImageFindUniqueArgs} args - Arguments to find a BackgroundImage
     * @example
     * // Get one BackgroundImage
     * const backgroundImage = await prisma.backgroundImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BackgroundImageFindUniqueArgs>(args: SelectSubset<T, BackgroundImageFindUniqueArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BackgroundImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BackgroundImageFindUniqueOrThrowArgs} args - Arguments to find a BackgroundImage
     * @example
     * // Get one BackgroundImage
     * const backgroundImage = await prisma.backgroundImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BackgroundImageFindUniqueOrThrowArgs>(args: SelectSubset<T, BackgroundImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BackgroundImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundImageFindFirstArgs} args - Arguments to find a BackgroundImage
     * @example
     * // Get one BackgroundImage
     * const backgroundImage = await prisma.backgroundImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BackgroundImageFindFirstArgs>(args?: SelectSubset<T, BackgroundImageFindFirstArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BackgroundImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundImageFindFirstOrThrowArgs} args - Arguments to find a BackgroundImage
     * @example
     * // Get one BackgroundImage
     * const backgroundImage = await prisma.backgroundImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BackgroundImageFindFirstOrThrowArgs>(args?: SelectSubset<T, BackgroundImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BackgroundImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BackgroundImages
     * const backgroundImages = await prisma.backgroundImage.findMany()
     * 
     * // Get first 10 BackgroundImages
     * const backgroundImages = await prisma.backgroundImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backgroundImageWithIdOnly = await prisma.backgroundImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BackgroundImageFindManyArgs>(args?: SelectSubset<T, BackgroundImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BackgroundImage.
     * @param {BackgroundImageCreateArgs} args - Arguments to create a BackgroundImage.
     * @example
     * // Create one BackgroundImage
     * const BackgroundImage = await prisma.backgroundImage.create({
     *   data: {
     *     // ... data to create a BackgroundImage
     *   }
     * })
     * 
     */
    create<T extends BackgroundImageCreateArgs>(args: SelectSubset<T, BackgroundImageCreateArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BackgroundImages.
     * @param {BackgroundImageCreateManyArgs} args - Arguments to create many BackgroundImages.
     * @example
     * // Create many BackgroundImages
     * const backgroundImage = await prisma.backgroundImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BackgroundImageCreateManyArgs>(args?: SelectSubset<T, BackgroundImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BackgroundImages and returns the data saved in the database.
     * @param {BackgroundImageCreateManyAndReturnArgs} args - Arguments to create many BackgroundImages.
     * @example
     * // Create many BackgroundImages
     * const backgroundImage = await prisma.backgroundImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BackgroundImages and only return the `id`
     * const backgroundImageWithIdOnly = await prisma.backgroundImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BackgroundImageCreateManyAndReturnArgs>(args?: SelectSubset<T, BackgroundImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BackgroundImage.
     * @param {BackgroundImageDeleteArgs} args - Arguments to delete one BackgroundImage.
     * @example
     * // Delete one BackgroundImage
     * const BackgroundImage = await prisma.backgroundImage.delete({
     *   where: {
     *     // ... filter to delete one BackgroundImage
     *   }
     * })
     * 
     */
    delete<T extends BackgroundImageDeleteArgs>(args: SelectSubset<T, BackgroundImageDeleteArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BackgroundImage.
     * @param {BackgroundImageUpdateArgs} args - Arguments to update one BackgroundImage.
     * @example
     * // Update one BackgroundImage
     * const backgroundImage = await prisma.backgroundImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BackgroundImageUpdateArgs>(args: SelectSubset<T, BackgroundImageUpdateArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BackgroundImages.
     * @param {BackgroundImageDeleteManyArgs} args - Arguments to filter BackgroundImages to delete.
     * @example
     * // Delete a few BackgroundImages
     * const { count } = await prisma.backgroundImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BackgroundImageDeleteManyArgs>(args?: SelectSubset<T, BackgroundImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackgroundImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BackgroundImages
     * const backgroundImage = await prisma.backgroundImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BackgroundImageUpdateManyArgs>(args: SelectSubset<T, BackgroundImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackgroundImages and returns the data updated in the database.
     * @param {BackgroundImageUpdateManyAndReturnArgs} args - Arguments to update many BackgroundImages.
     * @example
     * // Update many BackgroundImages
     * const backgroundImage = await prisma.backgroundImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BackgroundImages and only return the `id`
     * const backgroundImageWithIdOnly = await prisma.backgroundImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BackgroundImageUpdateManyAndReturnArgs>(args: SelectSubset<T, BackgroundImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BackgroundImage.
     * @param {BackgroundImageUpsertArgs} args - Arguments to update or create a BackgroundImage.
     * @example
     * // Update or create a BackgroundImage
     * const backgroundImage = await prisma.backgroundImage.upsert({
     *   create: {
     *     // ... data to create a BackgroundImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BackgroundImage we want to update
     *   }
     * })
     */
    upsert<T extends BackgroundImageUpsertArgs>(args: SelectSubset<T, BackgroundImageUpsertArgs<ExtArgs>>): Prisma__BackgroundImageClient<$Result.GetResult<Prisma.$BackgroundImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BackgroundImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundImageCountArgs} args - Arguments to filter BackgroundImages to count.
     * @example
     * // Count the number of BackgroundImages
     * const count = await prisma.backgroundImage.count({
     *   where: {
     *     // ... the filter for the BackgroundImages we want to count
     *   }
     * })
    **/
    count<T extends BackgroundImageCountArgs>(
      args?: Subset<T, BackgroundImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BackgroundImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BackgroundImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BackgroundImageAggregateArgs>(args: Subset<T, BackgroundImageAggregateArgs>): Prisma.PrismaPromise<GetBackgroundImageAggregateType<T>>

    /**
     * Group by BackgroundImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BackgroundImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BackgroundImageGroupByArgs['orderBy'] }
        : { orderBy?: BackgroundImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BackgroundImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackgroundImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BackgroundImage model
   */
  readonly fields: BackgroundImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BackgroundImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BackgroundImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BackgroundImage model
   */
  interface BackgroundImageFieldRefs {
    readonly id: FieldRef<"BackgroundImage", 'String'>
    readonly ownerId: FieldRef<"BackgroundImage", 'String'>
    readonly name: FieldRef<"BackgroundImage", 'String'>
    readonly fileName: FieldRef<"BackgroundImage", 'String'>
    readonly storagePath: FieldRef<"BackgroundImage", 'String'>
    readonly fileSize: FieldRef<"BackgroundImage", 'Int'>
    readonly mimeType: FieldRef<"BackgroundImage", 'String'>
    readonly width: FieldRef<"BackgroundImage", 'Int'>
    readonly height: FieldRef<"BackgroundImage", 'Int'>
    readonly isActive: FieldRef<"BackgroundImage", 'Boolean'>
    readonly createdAt: FieldRef<"BackgroundImage", 'DateTime'>
    readonly updatedAt: FieldRef<"BackgroundImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BackgroundImage findUnique
   */
  export type BackgroundImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundImage to fetch.
     */
    where: BackgroundImageWhereUniqueInput
  }

  /**
   * BackgroundImage findUniqueOrThrow
   */
  export type BackgroundImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundImage to fetch.
     */
    where: BackgroundImageWhereUniqueInput
  }

  /**
   * BackgroundImage findFirst
   */
  export type BackgroundImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundImage to fetch.
     */
    where?: BackgroundImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundImages to fetch.
     */
    orderBy?: BackgroundImageOrderByWithRelationInput | BackgroundImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackgroundImages.
     */
    cursor?: BackgroundImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackgroundImages.
     */
    distinct?: BackgroundImageScalarFieldEnum | BackgroundImageScalarFieldEnum[]
  }

  /**
   * BackgroundImage findFirstOrThrow
   */
  export type BackgroundImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundImage to fetch.
     */
    where?: BackgroundImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundImages to fetch.
     */
    orderBy?: BackgroundImageOrderByWithRelationInput | BackgroundImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackgroundImages.
     */
    cursor?: BackgroundImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackgroundImages.
     */
    distinct?: BackgroundImageScalarFieldEnum | BackgroundImageScalarFieldEnum[]
  }

  /**
   * BackgroundImage findMany
   */
  export type BackgroundImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundImages to fetch.
     */
    where?: BackgroundImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundImages to fetch.
     */
    orderBy?: BackgroundImageOrderByWithRelationInput | BackgroundImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BackgroundImages.
     */
    cursor?: BackgroundImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundImages.
     */
    skip?: number
    distinct?: BackgroundImageScalarFieldEnum | BackgroundImageScalarFieldEnum[]
  }

  /**
   * BackgroundImage create
   */
  export type BackgroundImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * The data needed to create a BackgroundImage.
     */
    data: XOR<BackgroundImageCreateInput, BackgroundImageUncheckedCreateInput>
  }

  /**
   * BackgroundImage createMany
   */
  export type BackgroundImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BackgroundImages.
     */
    data: BackgroundImageCreateManyInput | BackgroundImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BackgroundImage createManyAndReturn
   */
  export type BackgroundImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * The data used to create many BackgroundImages.
     */
    data: BackgroundImageCreateManyInput | BackgroundImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BackgroundImage update
   */
  export type BackgroundImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * The data needed to update a BackgroundImage.
     */
    data: XOR<BackgroundImageUpdateInput, BackgroundImageUncheckedUpdateInput>
    /**
     * Choose, which BackgroundImage to update.
     */
    where: BackgroundImageWhereUniqueInput
  }

  /**
   * BackgroundImage updateMany
   */
  export type BackgroundImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BackgroundImages.
     */
    data: XOR<BackgroundImageUpdateManyMutationInput, BackgroundImageUncheckedUpdateManyInput>
    /**
     * Filter which BackgroundImages to update
     */
    where?: BackgroundImageWhereInput
    /**
     * Limit how many BackgroundImages to update.
     */
    limit?: number
  }

  /**
   * BackgroundImage updateManyAndReturn
   */
  export type BackgroundImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * The data used to update BackgroundImages.
     */
    data: XOR<BackgroundImageUpdateManyMutationInput, BackgroundImageUncheckedUpdateManyInput>
    /**
     * Filter which BackgroundImages to update
     */
    where?: BackgroundImageWhereInput
    /**
     * Limit how many BackgroundImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BackgroundImage upsert
   */
  export type BackgroundImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * The filter to search for the BackgroundImage to update in case it exists.
     */
    where: BackgroundImageWhereUniqueInput
    /**
     * In case the BackgroundImage found by the `where` argument doesn't exist, create a new BackgroundImage with this data.
     */
    create: XOR<BackgroundImageCreateInput, BackgroundImageUncheckedCreateInput>
    /**
     * In case the BackgroundImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BackgroundImageUpdateInput, BackgroundImageUncheckedUpdateInput>
  }

  /**
   * BackgroundImage delete
   */
  export type BackgroundImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
    /**
     * Filter which BackgroundImage to delete.
     */
    where: BackgroundImageWhereUniqueInput
  }

  /**
   * BackgroundImage deleteMany
   */
  export type BackgroundImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackgroundImages to delete
     */
    where?: BackgroundImageWhereInput
    /**
     * Limit how many BackgroundImages to delete.
     */
    limit?: number
  }

  /**
   * BackgroundImage without action
   */
  export type BackgroundImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundImage
     */
    select?: BackgroundImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundImage
     */
    omit?: BackgroundImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundImageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    plan: 'plan',
    isActive: 'isActive',
    isVerified: 'isVerified',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripePriceId: 'stripePriceId',
    subscriptionStatus: 'subscriptionStatus',
    currentPeriodEnd: 'currentPeriodEnd',
    rolloverCredits: 'rolloverCredits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const UsageStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    countdownsCreated: 'countdownsCreated',
    activeCountdowns: 'activeCountdowns',
    monthlyViews: 'monthlyViews',
    totalViews: 'totalViews',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    updatedAt: 'updatedAt'
  };

  export type UsageStatsScalarFieldEnum = (typeof UsageStatsScalarFieldEnum)[keyof typeof UsageStatsScalarFieldEnum]


  export const CountdownScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    title: 'title',
    endAt: 'endAt',
    timezone: 'timezone',
    status: 'status',
    styleConfig: 'styleConfig',
    viewCount: 'viewCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CountdownScalarFieldEnum = (typeof CountdownScalarFieldEnum)[keyof typeof CountdownScalarFieldEnum]


  export const UsageMonthScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    month: 'month',
    viewsUsed: 'viewsUsed',
    viewsLimit: 'viewsLimit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsageMonthScalarFieldEnum = (typeof UsageMonthScalarFieldEnum)[keyof typeof UsageMonthScalarFieldEnum]


  export const CustomFontScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    name: 'name',
    fileName: 'fileName',
    storagePath: 'storagePath',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomFontScalarFieldEnum = (typeof CustomFontScalarFieldEnum)[keyof typeof CustomFontScalarFieldEnum]


  export const BackgroundImageScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    name: 'name',
    fileName: 'fileName',
    storagePath: 'storagePath',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    width: 'width',
    height: 'height',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BackgroundImageScalarFieldEnum = (typeof BackgroundImageScalarFieldEnum)[keyof typeof BackgroundImageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Plan'
   */
  export type EnumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plan'>
    


  /**
   * Reference to a field of type 'Plan[]'
   */
  export type ListEnumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Plan[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CountdownStatus'
   */
  export type EnumCountdownStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CountdownStatus'>
    


  /**
   * Reference to a field of type 'CountdownStatus[]'
   */
  export type ListEnumCountdownStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CountdownStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    plan?: EnumPlanFilter<"User"> | $Enums.Plan
    isActive?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"User"> | string | null
    stripePriceId?: StringNullableFilter<"User"> | string | null
    subscriptionStatus?: StringNullableFilter<"User"> | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"User"> | Date | string | null
    rolloverCredits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    refreshTokens?: RefreshTokenListRelationFilter
    usageStats?: XOR<UsageStatsNullableScalarRelationFilter, UsageStatsWhereInput> | null
    countdowns?: CountdownListRelationFilter
    usageMonths?: UsageMonthListRelationFilter
    customFonts?: CustomFontListRelationFilter
    backgroundImages?: BackgroundImageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    plan?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    rolloverCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    usageStats?: UsageStatsOrderByWithRelationInput
    countdowns?: CountdownOrderByRelationAggregateInput
    usageMonths?: UsageMonthOrderByRelationAggregateInput
    customFonts?: CustomFontOrderByRelationAggregateInput
    backgroundImages?: BackgroundImageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    plan?: EnumPlanFilter<"User"> | $Enums.Plan
    isActive?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    stripePriceId?: StringNullableFilter<"User"> | string | null
    subscriptionStatus?: StringNullableFilter<"User"> | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"User"> | Date | string | null
    rolloverCredits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    refreshTokens?: RefreshTokenListRelationFilter
    usageStats?: XOR<UsageStatsNullableScalarRelationFilter, UsageStatsWhereInput> | null
    countdowns?: CountdownListRelationFilter
    usageMonths?: UsageMonthListRelationFilter
    customFonts?: CustomFontListRelationFilter
    backgroundImages?: BackgroundImageListRelationFilter
  }, "id" | "email" | "stripeCustomerId" | "stripeSubscriptionId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    plan?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    rolloverCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    plan?: EnumPlanWithAggregatesFilter<"User"> | $Enums.Plan
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"User"> | string | null
    stripePriceId?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    rolloverCredits?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    userAgent?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type UsageStatsWhereInput = {
    AND?: UsageStatsWhereInput | UsageStatsWhereInput[]
    OR?: UsageStatsWhereInput[]
    NOT?: UsageStatsWhereInput | UsageStatsWhereInput[]
    id?: StringFilter<"UsageStats"> | string
    userId?: StringFilter<"UsageStats"> | string
    countdownsCreated?: IntFilter<"UsageStats"> | number
    activeCountdowns?: IntFilter<"UsageStats"> | number
    monthlyViews?: IntFilter<"UsageStats"> | number
    totalViews?: IntFilter<"UsageStats"> | number
    currentPeriodStart?: DateTimeFilter<"UsageStats"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"UsageStats"> | Date | string
    updatedAt?: DateTimeFilter<"UsageStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UsageStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    countdownsCreated?: SortOrder
    activeCountdowns?: SortOrder
    monthlyViews?: SortOrder
    totalViews?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UsageStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UsageStatsWhereInput | UsageStatsWhereInput[]
    OR?: UsageStatsWhereInput[]
    NOT?: UsageStatsWhereInput | UsageStatsWhereInput[]
    countdownsCreated?: IntFilter<"UsageStats"> | number
    activeCountdowns?: IntFilter<"UsageStats"> | number
    monthlyViews?: IntFilter<"UsageStats"> | number
    totalViews?: IntFilter<"UsageStats"> | number
    currentPeriodStart?: DateTimeFilter<"UsageStats"> | Date | string
    currentPeriodEnd?: DateTimeFilter<"UsageStats"> | Date | string
    updatedAt?: DateTimeFilter<"UsageStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UsageStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    countdownsCreated?: SortOrder
    activeCountdowns?: SortOrder
    monthlyViews?: SortOrder
    totalViews?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    updatedAt?: SortOrder
    _count?: UsageStatsCountOrderByAggregateInput
    _avg?: UsageStatsAvgOrderByAggregateInput
    _max?: UsageStatsMaxOrderByAggregateInput
    _min?: UsageStatsMinOrderByAggregateInput
    _sum?: UsageStatsSumOrderByAggregateInput
  }

  export type UsageStatsScalarWhereWithAggregatesInput = {
    AND?: UsageStatsScalarWhereWithAggregatesInput | UsageStatsScalarWhereWithAggregatesInput[]
    OR?: UsageStatsScalarWhereWithAggregatesInput[]
    NOT?: UsageStatsScalarWhereWithAggregatesInput | UsageStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageStats"> | string
    userId?: StringWithAggregatesFilter<"UsageStats"> | string
    countdownsCreated?: IntWithAggregatesFilter<"UsageStats"> | number
    activeCountdowns?: IntWithAggregatesFilter<"UsageStats"> | number
    monthlyViews?: IntWithAggregatesFilter<"UsageStats"> | number
    totalViews?: IntWithAggregatesFilter<"UsageStats"> | number
    currentPeriodStart?: DateTimeWithAggregatesFilter<"UsageStats"> | Date | string
    currentPeriodEnd?: DateTimeWithAggregatesFilter<"UsageStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UsageStats"> | Date | string
  }

  export type CountdownWhereInput = {
    AND?: CountdownWhereInput | CountdownWhereInput[]
    OR?: CountdownWhereInput[]
    NOT?: CountdownWhereInput | CountdownWhereInput[]
    id?: StringFilter<"Countdown"> | string
    ownerId?: StringFilter<"Countdown"> | string
    title?: StringFilter<"Countdown"> | string
    endAt?: DateTimeFilter<"Countdown"> | Date | string
    timezone?: StringFilter<"Countdown"> | string
    status?: EnumCountdownStatusFilter<"Countdown"> | $Enums.CountdownStatus
    styleConfig?: JsonFilter<"Countdown">
    viewCount?: IntFilter<"Countdown"> | number
    createdAt?: DateTimeFilter<"Countdown"> | Date | string
    updatedAt?: DateTimeFilter<"Countdown"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CountdownOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    endAt?: SortOrder
    timezone?: SortOrder
    status?: SortOrder
    styleConfig?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
  }

  export type CountdownWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CountdownWhereInput | CountdownWhereInput[]
    OR?: CountdownWhereInput[]
    NOT?: CountdownWhereInput | CountdownWhereInput[]
    ownerId?: StringFilter<"Countdown"> | string
    title?: StringFilter<"Countdown"> | string
    endAt?: DateTimeFilter<"Countdown"> | Date | string
    timezone?: StringFilter<"Countdown"> | string
    status?: EnumCountdownStatusFilter<"Countdown"> | $Enums.CountdownStatus
    styleConfig?: JsonFilter<"Countdown">
    viewCount?: IntFilter<"Countdown"> | number
    createdAt?: DateTimeFilter<"Countdown"> | Date | string
    updatedAt?: DateTimeFilter<"Countdown"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CountdownOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    endAt?: SortOrder
    timezone?: SortOrder
    status?: SortOrder
    styleConfig?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CountdownCountOrderByAggregateInput
    _avg?: CountdownAvgOrderByAggregateInput
    _max?: CountdownMaxOrderByAggregateInput
    _min?: CountdownMinOrderByAggregateInput
    _sum?: CountdownSumOrderByAggregateInput
  }

  export type CountdownScalarWhereWithAggregatesInput = {
    AND?: CountdownScalarWhereWithAggregatesInput | CountdownScalarWhereWithAggregatesInput[]
    OR?: CountdownScalarWhereWithAggregatesInput[]
    NOT?: CountdownScalarWhereWithAggregatesInput | CountdownScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Countdown"> | string
    ownerId?: StringWithAggregatesFilter<"Countdown"> | string
    title?: StringWithAggregatesFilter<"Countdown"> | string
    endAt?: DateTimeWithAggregatesFilter<"Countdown"> | Date | string
    timezone?: StringWithAggregatesFilter<"Countdown"> | string
    status?: EnumCountdownStatusWithAggregatesFilter<"Countdown"> | $Enums.CountdownStatus
    styleConfig?: JsonWithAggregatesFilter<"Countdown">
    viewCount?: IntWithAggregatesFilter<"Countdown"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Countdown"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Countdown"> | Date | string
  }

  export type UsageMonthWhereInput = {
    AND?: UsageMonthWhereInput | UsageMonthWhereInput[]
    OR?: UsageMonthWhereInput[]
    NOT?: UsageMonthWhereInput | UsageMonthWhereInput[]
    id?: StringFilter<"UsageMonth"> | string
    userId?: StringFilter<"UsageMonth"> | string
    year?: IntFilter<"UsageMonth"> | number
    month?: IntFilter<"UsageMonth"> | number
    viewsUsed?: IntFilter<"UsageMonth"> | number
    viewsLimit?: IntFilter<"UsageMonth"> | number
    createdAt?: DateTimeFilter<"UsageMonth"> | Date | string
    updatedAt?: DateTimeFilter<"UsageMonth"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UsageMonthOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    viewsUsed?: SortOrder
    viewsLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UsageMonthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year_month?: UsageMonthUserIdYearMonthCompoundUniqueInput
    AND?: UsageMonthWhereInput | UsageMonthWhereInput[]
    OR?: UsageMonthWhereInput[]
    NOT?: UsageMonthWhereInput | UsageMonthWhereInput[]
    userId?: StringFilter<"UsageMonth"> | string
    year?: IntFilter<"UsageMonth"> | number
    month?: IntFilter<"UsageMonth"> | number
    viewsUsed?: IntFilter<"UsageMonth"> | number
    viewsLimit?: IntFilter<"UsageMonth"> | number
    createdAt?: DateTimeFilter<"UsageMonth"> | Date | string
    updatedAt?: DateTimeFilter<"UsageMonth"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year_month">

  export type UsageMonthOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    viewsUsed?: SortOrder
    viewsLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsageMonthCountOrderByAggregateInput
    _avg?: UsageMonthAvgOrderByAggregateInput
    _max?: UsageMonthMaxOrderByAggregateInput
    _min?: UsageMonthMinOrderByAggregateInput
    _sum?: UsageMonthSumOrderByAggregateInput
  }

  export type UsageMonthScalarWhereWithAggregatesInput = {
    AND?: UsageMonthScalarWhereWithAggregatesInput | UsageMonthScalarWhereWithAggregatesInput[]
    OR?: UsageMonthScalarWhereWithAggregatesInput[]
    NOT?: UsageMonthScalarWhereWithAggregatesInput | UsageMonthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageMonth"> | string
    userId?: StringWithAggregatesFilter<"UsageMonth"> | string
    year?: IntWithAggregatesFilter<"UsageMonth"> | number
    month?: IntWithAggregatesFilter<"UsageMonth"> | number
    viewsUsed?: IntWithAggregatesFilter<"UsageMonth"> | number
    viewsLimit?: IntWithAggregatesFilter<"UsageMonth"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UsageMonth"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UsageMonth"> | Date | string
  }

  export type CustomFontWhereInput = {
    AND?: CustomFontWhereInput | CustomFontWhereInput[]
    OR?: CustomFontWhereInput[]
    NOT?: CustomFontWhereInput | CustomFontWhereInput[]
    id?: StringFilter<"CustomFont"> | string
    ownerId?: StringFilter<"CustomFont"> | string
    name?: StringFilter<"CustomFont"> | string
    fileName?: StringFilter<"CustomFont"> | string
    storagePath?: StringFilter<"CustomFont"> | string
    fileSize?: IntFilter<"CustomFont"> | number
    mimeType?: StringFilter<"CustomFont"> | string
    isActive?: BoolFilter<"CustomFont"> | boolean
    createdAt?: DateTimeFilter<"CustomFont"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFont"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CustomFontOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
  }

  export type CustomFontWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomFontWhereInput | CustomFontWhereInput[]
    OR?: CustomFontWhereInput[]
    NOT?: CustomFontWhereInput | CustomFontWhereInput[]
    ownerId?: StringFilter<"CustomFont"> | string
    name?: StringFilter<"CustomFont"> | string
    fileName?: StringFilter<"CustomFont"> | string
    storagePath?: StringFilter<"CustomFont"> | string
    fileSize?: IntFilter<"CustomFont"> | number
    mimeType?: StringFilter<"CustomFont"> | string
    isActive?: BoolFilter<"CustomFont"> | boolean
    createdAt?: DateTimeFilter<"CustomFont"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFont"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CustomFontOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomFontCountOrderByAggregateInput
    _avg?: CustomFontAvgOrderByAggregateInput
    _max?: CustomFontMaxOrderByAggregateInput
    _min?: CustomFontMinOrderByAggregateInput
    _sum?: CustomFontSumOrderByAggregateInput
  }

  export type CustomFontScalarWhereWithAggregatesInput = {
    AND?: CustomFontScalarWhereWithAggregatesInput | CustomFontScalarWhereWithAggregatesInput[]
    OR?: CustomFontScalarWhereWithAggregatesInput[]
    NOT?: CustomFontScalarWhereWithAggregatesInput | CustomFontScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomFont"> | string
    ownerId?: StringWithAggregatesFilter<"CustomFont"> | string
    name?: StringWithAggregatesFilter<"CustomFont"> | string
    fileName?: StringWithAggregatesFilter<"CustomFont"> | string
    storagePath?: StringWithAggregatesFilter<"CustomFont"> | string
    fileSize?: IntWithAggregatesFilter<"CustomFont"> | number
    mimeType?: StringWithAggregatesFilter<"CustomFont"> | string
    isActive?: BoolWithAggregatesFilter<"CustomFont"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CustomFont"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomFont"> | Date | string
  }

  export type BackgroundImageWhereInput = {
    AND?: BackgroundImageWhereInput | BackgroundImageWhereInput[]
    OR?: BackgroundImageWhereInput[]
    NOT?: BackgroundImageWhereInput | BackgroundImageWhereInput[]
    id?: StringFilter<"BackgroundImage"> | string
    ownerId?: StringFilter<"BackgroundImage"> | string
    name?: StringFilter<"BackgroundImage"> | string
    fileName?: StringFilter<"BackgroundImage"> | string
    storagePath?: StringFilter<"BackgroundImage"> | string
    fileSize?: IntFilter<"BackgroundImage"> | number
    mimeType?: StringFilter<"BackgroundImage"> | string
    width?: IntFilter<"BackgroundImage"> | number
    height?: IntFilter<"BackgroundImage"> | number
    isActive?: BoolFilter<"BackgroundImage"> | boolean
    createdAt?: DateTimeFilter<"BackgroundImage"> | Date | string
    updatedAt?: DateTimeFilter<"BackgroundImage"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BackgroundImageOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
  }

  export type BackgroundImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BackgroundImageWhereInput | BackgroundImageWhereInput[]
    OR?: BackgroundImageWhereInput[]
    NOT?: BackgroundImageWhereInput | BackgroundImageWhereInput[]
    ownerId?: StringFilter<"BackgroundImage"> | string
    name?: StringFilter<"BackgroundImage"> | string
    fileName?: StringFilter<"BackgroundImage"> | string
    storagePath?: StringFilter<"BackgroundImage"> | string
    fileSize?: IntFilter<"BackgroundImage"> | number
    mimeType?: StringFilter<"BackgroundImage"> | string
    width?: IntFilter<"BackgroundImage"> | number
    height?: IntFilter<"BackgroundImage"> | number
    isActive?: BoolFilter<"BackgroundImage"> | boolean
    createdAt?: DateTimeFilter<"BackgroundImage"> | Date | string
    updatedAt?: DateTimeFilter<"BackgroundImage"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BackgroundImageOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BackgroundImageCountOrderByAggregateInput
    _avg?: BackgroundImageAvgOrderByAggregateInput
    _max?: BackgroundImageMaxOrderByAggregateInput
    _min?: BackgroundImageMinOrderByAggregateInput
    _sum?: BackgroundImageSumOrderByAggregateInput
  }

  export type BackgroundImageScalarWhereWithAggregatesInput = {
    AND?: BackgroundImageScalarWhereWithAggregatesInput | BackgroundImageScalarWhereWithAggregatesInput[]
    OR?: BackgroundImageScalarWhereWithAggregatesInput[]
    NOT?: BackgroundImageScalarWhereWithAggregatesInput | BackgroundImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BackgroundImage"> | string
    ownerId?: StringWithAggregatesFilter<"BackgroundImage"> | string
    name?: StringWithAggregatesFilter<"BackgroundImage"> | string
    fileName?: StringWithAggregatesFilter<"BackgroundImage"> | string
    storagePath?: StringWithAggregatesFilter<"BackgroundImage"> | string
    fileSize?: IntWithAggregatesFilter<"BackgroundImage"> | number
    mimeType?: StringWithAggregatesFilter<"BackgroundImage"> | string
    width?: IntWithAggregatesFilter<"BackgroundImage"> | number
    height?: IntWithAggregatesFilter<"BackgroundImage"> | number
    isActive?: BoolWithAggregatesFilter<"BackgroundImage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BackgroundImage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BackgroundImage"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsCreateNestedOneWithoutUserInput
    countdowns?: CountdownCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthCreateNestedManyWithoutUserInput
    customFonts?: CustomFontCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsUncheckedCreateNestedOneWithoutUserInput
    countdowns?: CountdownUncheckedCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthUncheckedCreateNestedManyWithoutUserInput
    customFonts?: CustomFontUncheckedCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUncheckedUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUncheckedUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUncheckedUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUncheckedUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageStatsCreateInput = {
    id?: string
    countdownsCreated?: number
    activeCountdowns?: number
    monthlyViews?: number
    totalViews?: number
    currentPeriodStart?: Date | string
    currentPeriodEnd: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUsageStatsInput
  }

  export type UsageStatsUncheckedCreateInput = {
    id?: string
    userId: string
    countdownsCreated?: number
    activeCountdowns?: number
    monthlyViews?: number
    totalViews?: number
    currentPeriodStart?: Date | string
    currentPeriodEnd: Date | string
    updatedAt?: Date | string
  }

  export type UsageStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    countdownsCreated?: IntFieldUpdateOperationsInput | number
    activeCountdowns?: IntFieldUpdateOperationsInput | number
    monthlyViews?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUsageStatsNestedInput
  }

  export type UsageStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    countdownsCreated?: IntFieldUpdateOperationsInput | number
    activeCountdowns?: IntFieldUpdateOperationsInput | number
    monthlyViews?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageStatsCreateManyInput = {
    id?: string
    userId: string
    countdownsCreated?: number
    activeCountdowns?: number
    monthlyViews?: number
    totalViews?: number
    currentPeriodStart?: Date | string
    currentPeriodEnd: Date | string
    updatedAt?: Date | string
  }

  export type UsageStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    countdownsCreated?: IntFieldUpdateOperationsInput | number
    activeCountdowns?: IntFieldUpdateOperationsInput | number
    monthlyViews?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    countdownsCreated?: IntFieldUpdateOperationsInput | number
    activeCountdowns?: IntFieldUpdateOperationsInput | number
    monthlyViews?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownCreateInput = {
    id?: string
    title: string
    endAt: Date | string
    timezone?: string
    status?: $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutCountdownsInput
  }

  export type CountdownUncheckedCreateInput = {
    id?: string
    ownerId: string
    title: string
    endAt: Date | string
    timezone?: string
    status?: $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountdownUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    status?: EnumCountdownStatusFieldUpdateOperationsInput | $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutCountdownsNestedInput
  }

  export type CountdownUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    status?: EnumCountdownStatusFieldUpdateOperationsInput | $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownCreateManyInput = {
    id?: string
    ownerId: string
    title: string
    endAt: Date | string
    timezone?: string
    status?: $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountdownUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    status?: EnumCountdownStatusFieldUpdateOperationsInput | $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    status?: EnumCountdownStatusFieldUpdateOperationsInput | $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMonthCreateInput = {
    id?: string
    year: number
    month: number
    viewsUsed?: number
    viewsLimit: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUsageMonthsInput
  }

  export type UsageMonthUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    month: number
    viewsUsed?: number
    viewsLimit: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageMonthUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    viewsUsed?: IntFieldUpdateOperationsInput | number
    viewsLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUsageMonthsNestedInput
  }

  export type UsageMonthUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    viewsUsed?: IntFieldUpdateOperationsInput | number
    viewsLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMonthCreateManyInput = {
    id?: string
    userId: string
    year: number
    month: number
    viewsUsed?: number
    viewsLimit: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageMonthUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    viewsUsed?: IntFieldUpdateOperationsInput | number
    viewsLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMonthUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    viewsUsed?: IntFieldUpdateOperationsInput | number
    viewsLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontCreateInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutCustomFontsInput
  }

  export type CustomFontUncheckedCreateInput = {
    id?: string
    ownerId: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFontUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutCustomFontsNestedInput
  }

  export type CustomFontUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontCreateManyInput = {
    id?: string
    ownerId: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFontUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundImageCreateInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    width: number
    height: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutBackgroundImagesInput
  }

  export type BackgroundImageUncheckedCreateInput = {
    id?: string
    ownerId: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    width: number
    height: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutBackgroundImagesNestedInput
  }

  export type BackgroundImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundImageCreateManyInput = {
    id?: string
    ownerId: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    width: number
    height: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanFilter<$PrismaModel> | $Enums.Plan
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type UsageStatsNullableScalarRelationFilter = {
    is?: UsageStatsWhereInput | null
    isNot?: UsageStatsWhereInput | null
  }

  export type CountdownListRelationFilter = {
    every?: CountdownWhereInput
    some?: CountdownWhereInput
    none?: CountdownWhereInput
  }

  export type UsageMonthListRelationFilter = {
    every?: UsageMonthWhereInput
    some?: UsageMonthWhereInput
    none?: UsageMonthWhereInput
  }

  export type CustomFontListRelationFilter = {
    every?: CustomFontWhereInput
    some?: CustomFontWhereInput
    none?: CustomFontWhereInput
  }

  export type BackgroundImageListRelationFilter = {
    every?: BackgroundImageWhereInput
    some?: BackgroundImageWhereInput
    none?: BackgroundImageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CountdownOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageMonthOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomFontOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BackgroundImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    plan?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrder
    rolloverCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    rolloverCredits?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    plan?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrder
    rolloverCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    plan?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    subscriptionStatus?: SortOrder
    currentPeriodEnd?: SortOrder
    rolloverCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    rolloverCredits?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanWithAggregatesFilter<$PrismaModel> | $Enums.Plan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanFilter<$PrismaModel>
    _max?: NestedEnumPlanFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    countdownsCreated?: SortOrder
    activeCountdowns?: SortOrder
    monthlyViews?: SortOrder
    totalViews?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageStatsAvgOrderByAggregateInput = {
    countdownsCreated?: SortOrder
    activeCountdowns?: SortOrder
    monthlyViews?: SortOrder
    totalViews?: SortOrder
  }

  export type UsageStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    countdownsCreated?: SortOrder
    activeCountdowns?: SortOrder
    monthlyViews?: SortOrder
    totalViews?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    countdownsCreated?: SortOrder
    activeCountdowns?: SortOrder
    monthlyViews?: SortOrder
    totalViews?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageStatsSumOrderByAggregateInput = {
    countdownsCreated?: SortOrder
    activeCountdowns?: SortOrder
    monthlyViews?: SortOrder
    totalViews?: SortOrder
  }

  export type EnumCountdownStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CountdownStatus | EnumCountdownStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCountdownStatusFilter<$PrismaModel> | $Enums.CountdownStatus
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CountdownCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    endAt?: SortOrder
    timezone?: SortOrder
    status?: SortOrder
    styleConfig?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountdownAvgOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type CountdownMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    endAt?: SortOrder
    timezone?: SortOrder
    status?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountdownMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    title?: SortOrder
    endAt?: SortOrder
    timezone?: SortOrder
    status?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountdownSumOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type EnumCountdownStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CountdownStatus | EnumCountdownStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCountdownStatusWithAggregatesFilter<$PrismaModel> | $Enums.CountdownStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCountdownStatusFilter<$PrismaModel>
    _max?: NestedEnumCountdownStatusFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UsageMonthUserIdYearMonthCompoundUniqueInput = {
    userId: string
    year: number
    month: number
  }

  export type UsageMonthCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    viewsUsed?: SortOrder
    viewsLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageMonthAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    viewsUsed?: SortOrder
    viewsLimit?: SortOrder
  }

  export type UsageMonthMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    viewsUsed?: SortOrder
    viewsLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageMonthMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    viewsUsed?: SortOrder
    viewsLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageMonthSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    viewsUsed?: SortOrder
    viewsLimit?: SortOrder
  }

  export type CustomFontCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFontAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type CustomFontMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFontMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomFontSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type BackgroundImageCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BackgroundImageAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type BackgroundImageMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BackgroundImageMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    fileName?: SortOrder
    storagePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BackgroundImageSumOrderByAggregateInput = {
    fileSize?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type UsageStatsCreateNestedOneWithoutUserInput = {
    create?: XOR<UsageStatsCreateWithoutUserInput, UsageStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UsageStatsCreateOrConnectWithoutUserInput
    connect?: UsageStatsWhereUniqueInput
  }

  export type CountdownCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CountdownCreateWithoutOwnerInput, CountdownUncheckedCreateWithoutOwnerInput> | CountdownCreateWithoutOwnerInput[] | CountdownUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CountdownCreateOrConnectWithoutOwnerInput | CountdownCreateOrConnectWithoutOwnerInput[]
    createMany?: CountdownCreateManyOwnerInputEnvelope
    connect?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
  }

  export type UsageMonthCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageMonthCreateWithoutUserInput, UsageMonthUncheckedCreateWithoutUserInput> | UsageMonthCreateWithoutUserInput[] | UsageMonthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageMonthCreateOrConnectWithoutUserInput | UsageMonthCreateOrConnectWithoutUserInput[]
    createMany?: UsageMonthCreateManyUserInputEnvelope
    connect?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
  }

  export type CustomFontCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CustomFontCreateWithoutOwnerInput, CustomFontUncheckedCreateWithoutOwnerInput> | CustomFontCreateWithoutOwnerInput[] | CustomFontUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CustomFontCreateOrConnectWithoutOwnerInput | CustomFontCreateOrConnectWithoutOwnerInput[]
    createMany?: CustomFontCreateManyOwnerInputEnvelope
    connect?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
  }

  export type BackgroundImageCreateNestedManyWithoutOwnerInput = {
    create?: XOR<BackgroundImageCreateWithoutOwnerInput, BackgroundImageUncheckedCreateWithoutOwnerInput> | BackgroundImageCreateWithoutOwnerInput[] | BackgroundImageUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BackgroundImageCreateOrConnectWithoutOwnerInput | BackgroundImageCreateOrConnectWithoutOwnerInput[]
    createMany?: BackgroundImageCreateManyOwnerInputEnvelope
    connect?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type UsageStatsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UsageStatsCreateWithoutUserInput, UsageStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UsageStatsCreateOrConnectWithoutUserInput
    connect?: UsageStatsWhereUniqueInput
  }

  export type CountdownUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CountdownCreateWithoutOwnerInput, CountdownUncheckedCreateWithoutOwnerInput> | CountdownCreateWithoutOwnerInput[] | CountdownUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CountdownCreateOrConnectWithoutOwnerInput | CountdownCreateOrConnectWithoutOwnerInput[]
    createMany?: CountdownCreateManyOwnerInputEnvelope
    connect?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
  }

  export type UsageMonthUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageMonthCreateWithoutUserInput, UsageMonthUncheckedCreateWithoutUserInput> | UsageMonthCreateWithoutUserInput[] | UsageMonthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageMonthCreateOrConnectWithoutUserInput | UsageMonthCreateOrConnectWithoutUserInput[]
    createMany?: UsageMonthCreateManyUserInputEnvelope
    connect?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
  }

  export type CustomFontUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<CustomFontCreateWithoutOwnerInput, CustomFontUncheckedCreateWithoutOwnerInput> | CustomFontCreateWithoutOwnerInput[] | CustomFontUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CustomFontCreateOrConnectWithoutOwnerInput | CustomFontCreateOrConnectWithoutOwnerInput[]
    createMany?: CustomFontCreateManyOwnerInputEnvelope
    connect?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
  }

  export type BackgroundImageUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<BackgroundImageCreateWithoutOwnerInput, BackgroundImageUncheckedCreateWithoutOwnerInput> | BackgroundImageCreateWithoutOwnerInput[] | BackgroundImageUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BackgroundImageCreateOrConnectWithoutOwnerInput | BackgroundImageCreateOrConnectWithoutOwnerInput[]
    createMany?: BackgroundImageCreateManyOwnerInputEnvelope
    connect?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumPlanFieldUpdateOperationsInput = {
    set?: $Enums.Plan
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UsageStatsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UsageStatsCreateWithoutUserInput, UsageStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UsageStatsCreateOrConnectWithoutUserInput
    upsert?: UsageStatsUpsertWithoutUserInput
    disconnect?: UsageStatsWhereInput | boolean
    delete?: UsageStatsWhereInput | boolean
    connect?: UsageStatsWhereUniqueInput
    update?: XOR<XOR<UsageStatsUpdateToOneWithWhereWithoutUserInput, UsageStatsUpdateWithoutUserInput>, UsageStatsUncheckedUpdateWithoutUserInput>
  }

  export type CountdownUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CountdownCreateWithoutOwnerInput, CountdownUncheckedCreateWithoutOwnerInput> | CountdownCreateWithoutOwnerInput[] | CountdownUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CountdownCreateOrConnectWithoutOwnerInput | CountdownCreateOrConnectWithoutOwnerInput[]
    upsert?: CountdownUpsertWithWhereUniqueWithoutOwnerInput | CountdownUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CountdownCreateManyOwnerInputEnvelope
    set?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    disconnect?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    delete?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    connect?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    update?: CountdownUpdateWithWhereUniqueWithoutOwnerInput | CountdownUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CountdownUpdateManyWithWhereWithoutOwnerInput | CountdownUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CountdownScalarWhereInput | CountdownScalarWhereInput[]
  }

  export type UsageMonthUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageMonthCreateWithoutUserInput, UsageMonthUncheckedCreateWithoutUserInput> | UsageMonthCreateWithoutUserInput[] | UsageMonthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageMonthCreateOrConnectWithoutUserInput | UsageMonthCreateOrConnectWithoutUserInput[]
    upsert?: UsageMonthUpsertWithWhereUniqueWithoutUserInput | UsageMonthUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageMonthCreateManyUserInputEnvelope
    set?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    disconnect?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    delete?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    connect?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    update?: UsageMonthUpdateWithWhereUniqueWithoutUserInput | UsageMonthUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageMonthUpdateManyWithWhereWithoutUserInput | UsageMonthUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageMonthScalarWhereInput | UsageMonthScalarWhereInput[]
  }

  export type CustomFontUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CustomFontCreateWithoutOwnerInput, CustomFontUncheckedCreateWithoutOwnerInput> | CustomFontCreateWithoutOwnerInput[] | CustomFontUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CustomFontCreateOrConnectWithoutOwnerInput | CustomFontCreateOrConnectWithoutOwnerInput[]
    upsert?: CustomFontUpsertWithWhereUniqueWithoutOwnerInput | CustomFontUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CustomFontCreateManyOwnerInputEnvelope
    set?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    disconnect?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    delete?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    connect?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    update?: CustomFontUpdateWithWhereUniqueWithoutOwnerInput | CustomFontUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CustomFontUpdateManyWithWhereWithoutOwnerInput | CustomFontUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CustomFontScalarWhereInput | CustomFontScalarWhereInput[]
  }

  export type BackgroundImageUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<BackgroundImageCreateWithoutOwnerInput, BackgroundImageUncheckedCreateWithoutOwnerInput> | BackgroundImageCreateWithoutOwnerInput[] | BackgroundImageUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BackgroundImageCreateOrConnectWithoutOwnerInput | BackgroundImageCreateOrConnectWithoutOwnerInput[]
    upsert?: BackgroundImageUpsertWithWhereUniqueWithoutOwnerInput | BackgroundImageUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: BackgroundImageCreateManyOwnerInputEnvelope
    set?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    disconnect?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    delete?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    connect?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    update?: BackgroundImageUpdateWithWhereUniqueWithoutOwnerInput | BackgroundImageUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: BackgroundImageUpdateManyWithWhereWithoutOwnerInput | BackgroundImageUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: BackgroundImageScalarWhereInput | BackgroundImageScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UsageStatsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UsageStatsCreateWithoutUserInput, UsageStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UsageStatsCreateOrConnectWithoutUserInput
    upsert?: UsageStatsUpsertWithoutUserInput
    disconnect?: UsageStatsWhereInput | boolean
    delete?: UsageStatsWhereInput | boolean
    connect?: UsageStatsWhereUniqueInput
    update?: XOR<XOR<UsageStatsUpdateToOneWithWhereWithoutUserInput, UsageStatsUpdateWithoutUserInput>, UsageStatsUncheckedUpdateWithoutUserInput>
  }

  export type CountdownUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CountdownCreateWithoutOwnerInput, CountdownUncheckedCreateWithoutOwnerInput> | CountdownCreateWithoutOwnerInput[] | CountdownUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CountdownCreateOrConnectWithoutOwnerInput | CountdownCreateOrConnectWithoutOwnerInput[]
    upsert?: CountdownUpsertWithWhereUniqueWithoutOwnerInput | CountdownUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CountdownCreateManyOwnerInputEnvelope
    set?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    disconnect?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    delete?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    connect?: CountdownWhereUniqueInput | CountdownWhereUniqueInput[]
    update?: CountdownUpdateWithWhereUniqueWithoutOwnerInput | CountdownUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CountdownUpdateManyWithWhereWithoutOwnerInput | CountdownUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CountdownScalarWhereInput | CountdownScalarWhereInput[]
  }

  export type UsageMonthUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageMonthCreateWithoutUserInput, UsageMonthUncheckedCreateWithoutUserInput> | UsageMonthCreateWithoutUserInput[] | UsageMonthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageMonthCreateOrConnectWithoutUserInput | UsageMonthCreateOrConnectWithoutUserInput[]
    upsert?: UsageMonthUpsertWithWhereUniqueWithoutUserInput | UsageMonthUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageMonthCreateManyUserInputEnvelope
    set?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    disconnect?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    delete?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    connect?: UsageMonthWhereUniqueInput | UsageMonthWhereUniqueInput[]
    update?: UsageMonthUpdateWithWhereUniqueWithoutUserInput | UsageMonthUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageMonthUpdateManyWithWhereWithoutUserInput | UsageMonthUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageMonthScalarWhereInput | UsageMonthScalarWhereInput[]
  }

  export type CustomFontUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<CustomFontCreateWithoutOwnerInput, CustomFontUncheckedCreateWithoutOwnerInput> | CustomFontCreateWithoutOwnerInput[] | CustomFontUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: CustomFontCreateOrConnectWithoutOwnerInput | CustomFontCreateOrConnectWithoutOwnerInput[]
    upsert?: CustomFontUpsertWithWhereUniqueWithoutOwnerInput | CustomFontUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: CustomFontCreateManyOwnerInputEnvelope
    set?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    disconnect?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    delete?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    connect?: CustomFontWhereUniqueInput | CustomFontWhereUniqueInput[]
    update?: CustomFontUpdateWithWhereUniqueWithoutOwnerInput | CustomFontUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: CustomFontUpdateManyWithWhereWithoutOwnerInput | CustomFontUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: CustomFontScalarWhereInput | CustomFontScalarWhereInput[]
  }

  export type BackgroundImageUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<BackgroundImageCreateWithoutOwnerInput, BackgroundImageUncheckedCreateWithoutOwnerInput> | BackgroundImageCreateWithoutOwnerInput[] | BackgroundImageUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: BackgroundImageCreateOrConnectWithoutOwnerInput | BackgroundImageCreateOrConnectWithoutOwnerInput[]
    upsert?: BackgroundImageUpsertWithWhereUniqueWithoutOwnerInput | BackgroundImageUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: BackgroundImageCreateManyOwnerInputEnvelope
    set?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    disconnect?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    delete?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    connect?: BackgroundImageWhereUniqueInput | BackgroundImageWhereUniqueInput[]
    update?: BackgroundImageUpdateWithWhereUniqueWithoutOwnerInput | BackgroundImageUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: BackgroundImageUpdateManyWithWhereWithoutOwnerInput | BackgroundImageUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: BackgroundImageScalarWhereInput | BackgroundImageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutUsageStatsInput = {
    create?: XOR<UserCreateWithoutUsageStatsInput, UserUncheckedCreateWithoutUsageStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageStatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUsageStatsNestedInput = {
    create?: XOR<UserCreateWithoutUsageStatsInput, UserUncheckedCreateWithoutUsageStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageStatsInput
    upsert?: UserUpsertWithoutUsageStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUsageStatsInput, UserUpdateWithoutUsageStatsInput>, UserUncheckedUpdateWithoutUsageStatsInput>
  }

  export type UserCreateNestedOneWithoutCountdownsInput = {
    create?: XOR<UserCreateWithoutCountdownsInput, UserUncheckedCreateWithoutCountdownsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCountdownsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCountdownStatusFieldUpdateOperationsInput = {
    set?: $Enums.CountdownStatus
  }

  export type UserUpdateOneRequiredWithoutCountdownsNestedInput = {
    create?: XOR<UserCreateWithoutCountdownsInput, UserUncheckedCreateWithoutCountdownsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCountdownsInput
    upsert?: UserUpsertWithoutCountdownsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCountdownsInput, UserUpdateWithoutCountdownsInput>, UserUncheckedUpdateWithoutCountdownsInput>
  }

  export type UserCreateNestedOneWithoutUsageMonthsInput = {
    create?: XOR<UserCreateWithoutUsageMonthsInput, UserUncheckedCreateWithoutUsageMonthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageMonthsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUsageMonthsNestedInput = {
    create?: XOR<UserCreateWithoutUsageMonthsInput, UserUncheckedCreateWithoutUsageMonthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageMonthsInput
    upsert?: UserUpsertWithoutUsageMonthsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUsageMonthsInput, UserUpdateWithoutUsageMonthsInput>, UserUncheckedUpdateWithoutUsageMonthsInput>
  }

  export type UserCreateNestedOneWithoutCustomFontsInput = {
    create?: XOR<UserCreateWithoutCustomFontsInput, UserUncheckedCreateWithoutCustomFontsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomFontsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCustomFontsNestedInput = {
    create?: XOR<UserCreateWithoutCustomFontsInput, UserUncheckedCreateWithoutCustomFontsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomFontsInput
    upsert?: UserUpsertWithoutCustomFontsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomFontsInput, UserUpdateWithoutCustomFontsInput>, UserUncheckedUpdateWithoutCustomFontsInput>
  }

  export type UserCreateNestedOneWithoutBackgroundImagesInput = {
    create?: XOR<UserCreateWithoutBackgroundImagesInput, UserUncheckedCreateWithoutBackgroundImagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBackgroundImagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBackgroundImagesNestedInput = {
    create?: XOR<UserCreateWithoutBackgroundImagesInput, UserUncheckedCreateWithoutBackgroundImagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBackgroundImagesInput
    upsert?: UserUpsertWithoutBackgroundImagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBackgroundImagesInput, UserUpdateWithoutBackgroundImagesInput>, UserUncheckedUpdateWithoutBackgroundImagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanFilter<$PrismaModel> | $Enums.Plan
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Plan | EnumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.Plan[] | ListEnumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanWithAggregatesFilter<$PrismaModel> | $Enums.Plan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanFilter<$PrismaModel>
    _max?: NestedEnumPlanFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCountdownStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CountdownStatus | EnumCountdownStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCountdownStatusFilter<$PrismaModel> | $Enums.CountdownStatus
  }

  export type NestedEnumCountdownStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CountdownStatus | EnumCountdownStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CountdownStatus[] | ListEnumCountdownStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCountdownStatusWithAggregatesFilter<$PrismaModel> | $Enums.CountdownStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCountdownStatusFilter<$PrismaModel>
    _max?: NestedEnumCountdownStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsageStatsCreateWithoutUserInput = {
    id?: string
    countdownsCreated?: number
    activeCountdowns?: number
    monthlyViews?: number
    totalViews?: number
    currentPeriodStart?: Date | string
    currentPeriodEnd: Date | string
    updatedAt?: Date | string
  }

  export type UsageStatsUncheckedCreateWithoutUserInput = {
    id?: string
    countdownsCreated?: number
    activeCountdowns?: number
    monthlyViews?: number
    totalViews?: number
    currentPeriodStart?: Date | string
    currentPeriodEnd: Date | string
    updatedAt?: Date | string
  }

  export type UsageStatsCreateOrConnectWithoutUserInput = {
    where: UsageStatsWhereUniqueInput
    create: XOR<UsageStatsCreateWithoutUserInput, UsageStatsUncheckedCreateWithoutUserInput>
  }

  export type CountdownCreateWithoutOwnerInput = {
    id?: string
    title: string
    endAt: Date | string
    timezone?: string
    status?: $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountdownUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    endAt: Date | string
    timezone?: string
    status?: $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountdownCreateOrConnectWithoutOwnerInput = {
    where: CountdownWhereUniqueInput
    create: XOR<CountdownCreateWithoutOwnerInput, CountdownUncheckedCreateWithoutOwnerInput>
  }

  export type CountdownCreateManyOwnerInputEnvelope = {
    data: CountdownCreateManyOwnerInput | CountdownCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type UsageMonthCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    viewsUsed?: number
    viewsLimit: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageMonthUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    viewsUsed?: number
    viewsLimit: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageMonthCreateOrConnectWithoutUserInput = {
    where: UsageMonthWhereUniqueInput
    create: XOR<UsageMonthCreateWithoutUserInput, UsageMonthUncheckedCreateWithoutUserInput>
  }

  export type UsageMonthCreateManyUserInputEnvelope = {
    data: UsageMonthCreateManyUserInput | UsageMonthCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CustomFontCreateWithoutOwnerInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFontUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFontCreateOrConnectWithoutOwnerInput = {
    where: CustomFontWhereUniqueInput
    create: XOR<CustomFontCreateWithoutOwnerInput, CustomFontUncheckedCreateWithoutOwnerInput>
  }

  export type CustomFontCreateManyOwnerInputEnvelope = {
    data: CustomFontCreateManyOwnerInput | CustomFontCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type BackgroundImageCreateWithoutOwnerInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    width: number
    height: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundImageUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    width: number
    height: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundImageCreateOrConnectWithoutOwnerInput = {
    where: BackgroundImageWhereUniqueInput
    create: XOR<BackgroundImageCreateWithoutOwnerInput, BackgroundImageUncheckedCreateWithoutOwnerInput>
  }

  export type BackgroundImageCreateManyOwnerInputEnvelope = {
    data: BackgroundImageCreateManyOwnerInput | BackgroundImageCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    userAgent?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type UsageStatsUpsertWithoutUserInput = {
    update: XOR<UsageStatsUpdateWithoutUserInput, UsageStatsUncheckedUpdateWithoutUserInput>
    create: XOR<UsageStatsCreateWithoutUserInput, UsageStatsUncheckedCreateWithoutUserInput>
    where?: UsageStatsWhereInput
  }

  export type UsageStatsUpdateToOneWithWhereWithoutUserInput = {
    where?: UsageStatsWhereInput
    data: XOR<UsageStatsUpdateWithoutUserInput, UsageStatsUncheckedUpdateWithoutUserInput>
  }

  export type UsageStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    countdownsCreated?: IntFieldUpdateOperationsInput | number
    activeCountdowns?: IntFieldUpdateOperationsInput | number
    monthlyViews?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    countdownsCreated?: IntFieldUpdateOperationsInput | number
    activeCountdowns?: IntFieldUpdateOperationsInput | number
    monthlyViews?: IntFieldUpdateOperationsInput | number
    totalViews?: IntFieldUpdateOperationsInput | number
    currentPeriodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPeriodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownUpsertWithWhereUniqueWithoutOwnerInput = {
    where: CountdownWhereUniqueInput
    update: XOR<CountdownUpdateWithoutOwnerInput, CountdownUncheckedUpdateWithoutOwnerInput>
    create: XOR<CountdownCreateWithoutOwnerInput, CountdownUncheckedCreateWithoutOwnerInput>
  }

  export type CountdownUpdateWithWhereUniqueWithoutOwnerInput = {
    where: CountdownWhereUniqueInput
    data: XOR<CountdownUpdateWithoutOwnerInput, CountdownUncheckedUpdateWithoutOwnerInput>
  }

  export type CountdownUpdateManyWithWhereWithoutOwnerInput = {
    where: CountdownScalarWhereInput
    data: XOR<CountdownUpdateManyMutationInput, CountdownUncheckedUpdateManyWithoutOwnerInput>
  }

  export type CountdownScalarWhereInput = {
    AND?: CountdownScalarWhereInput | CountdownScalarWhereInput[]
    OR?: CountdownScalarWhereInput[]
    NOT?: CountdownScalarWhereInput | CountdownScalarWhereInput[]
    id?: StringFilter<"Countdown"> | string
    ownerId?: StringFilter<"Countdown"> | string
    title?: StringFilter<"Countdown"> | string
    endAt?: DateTimeFilter<"Countdown"> | Date | string
    timezone?: StringFilter<"Countdown"> | string
    status?: EnumCountdownStatusFilter<"Countdown"> | $Enums.CountdownStatus
    styleConfig?: JsonFilter<"Countdown">
    viewCount?: IntFilter<"Countdown"> | number
    createdAt?: DateTimeFilter<"Countdown"> | Date | string
    updatedAt?: DateTimeFilter<"Countdown"> | Date | string
  }

  export type UsageMonthUpsertWithWhereUniqueWithoutUserInput = {
    where: UsageMonthWhereUniqueInput
    update: XOR<UsageMonthUpdateWithoutUserInput, UsageMonthUncheckedUpdateWithoutUserInput>
    create: XOR<UsageMonthCreateWithoutUserInput, UsageMonthUncheckedCreateWithoutUserInput>
  }

  export type UsageMonthUpdateWithWhereUniqueWithoutUserInput = {
    where: UsageMonthWhereUniqueInput
    data: XOR<UsageMonthUpdateWithoutUserInput, UsageMonthUncheckedUpdateWithoutUserInput>
  }

  export type UsageMonthUpdateManyWithWhereWithoutUserInput = {
    where: UsageMonthScalarWhereInput
    data: XOR<UsageMonthUpdateManyMutationInput, UsageMonthUncheckedUpdateManyWithoutUserInput>
  }

  export type UsageMonthScalarWhereInput = {
    AND?: UsageMonthScalarWhereInput | UsageMonthScalarWhereInput[]
    OR?: UsageMonthScalarWhereInput[]
    NOT?: UsageMonthScalarWhereInput | UsageMonthScalarWhereInput[]
    id?: StringFilter<"UsageMonth"> | string
    userId?: StringFilter<"UsageMonth"> | string
    year?: IntFilter<"UsageMonth"> | number
    month?: IntFilter<"UsageMonth"> | number
    viewsUsed?: IntFilter<"UsageMonth"> | number
    viewsLimit?: IntFilter<"UsageMonth"> | number
    createdAt?: DateTimeFilter<"UsageMonth"> | Date | string
    updatedAt?: DateTimeFilter<"UsageMonth"> | Date | string
  }

  export type CustomFontUpsertWithWhereUniqueWithoutOwnerInput = {
    where: CustomFontWhereUniqueInput
    update: XOR<CustomFontUpdateWithoutOwnerInput, CustomFontUncheckedUpdateWithoutOwnerInput>
    create: XOR<CustomFontCreateWithoutOwnerInput, CustomFontUncheckedCreateWithoutOwnerInput>
  }

  export type CustomFontUpdateWithWhereUniqueWithoutOwnerInput = {
    where: CustomFontWhereUniqueInput
    data: XOR<CustomFontUpdateWithoutOwnerInput, CustomFontUncheckedUpdateWithoutOwnerInput>
  }

  export type CustomFontUpdateManyWithWhereWithoutOwnerInput = {
    where: CustomFontScalarWhereInput
    data: XOR<CustomFontUpdateManyMutationInput, CustomFontUncheckedUpdateManyWithoutOwnerInput>
  }

  export type CustomFontScalarWhereInput = {
    AND?: CustomFontScalarWhereInput | CustomFontScalarWhereInput[]
    OR?: CustomFontScalarWhereInput[]
    NOT?: CustomFontScalarWhereInput | CustomFontScalarWhereInput[]
    id?: StringFilter<"CustomFont"> | string
    ownerId?: StringFilter<"CustomFont"> | string
    name?: StringFilter<"CustomFont"> | string
    fileName?: StringFilter<"CustomFont"> | string
    storagePath?: StringFilter<"CustomFont"> | string
    fileSize?: IntFilter<"CustomFont"> | number
    mimeType?: StringFilter<"CustomFont"> | string
    isActive?: BoolFilter<"CustomFont"> | boolean
    createdAt?: DateTimeFilter<"CustomFont"> | Date | string
    updatedAt?: DateTimeFilter<"CustomFont"> | Date | string
  }

  export type BackgroundImageUpsertWithWhereUniqueWithoutOwnerInput = {
    where: BackgroundImageWhereUniqueInput
    update: XOR<BackgroundImageUpdateWithoutOwnerInput, BackgroundImageUncheckedUpdateWithoutOwnerInput>
    create: XOR<BackgroundImageCreateWithoutOwnerInput, BackgroundImageUncheckedCreateWithoutOwnerInput>
  }

  export type BackgroundImageUpdateWithWhereUniqueWithoutOwnerInput = {
    where: BackgroundImageWhereUniqueInput
    data: XOR<BackgroundImageUpdateWithoutOwnerInput, BackgroundImageUncheckedUpdateWithoutOwnerInput>
  }

  export type BackgroundImageUpdateManyWithWhereWithoutOwnerInput = {
    where: BackgroundImageScalarWhereInput
    data: XOR<BackgroundImageUpdateManyMutationInput, BackgroundImageUncheckedUpdateManyWithoutOwnerInput>
  }

  export type BackgroundImageScalarWhereInput = {
    AND?: BackgroundImageScalarWhereInput | BackgroundImageScalarWhereInput[]
    OR?: BackgroundImageScalarWhereInput[]
    NOT?: BackgroundImageScalarWhereInput | BackgroundImageScalarWhereInput[]
    id?: StringFilter<"BackgroundImage"> | string
    ownerId?: StringFilter<"BackgroundImage"> | string
    name?: StringFilter<"BackgroundImage"> | string
    fileName?: StringFilter<"BackgroundImage"> | string
    storagePath?: StringFilter<"BackgroundImage"> | string
    fileSize?: IntFilter<"BackgroundImage"> | number
    mimeType?: StringFilter<"BackgroundImage"> | string
    width?: IntFilter<"BackgroundImage"> | number
    height?: IntFilter<"BackgroundImage"> | number
    isActive?: BoolFilter<"BackgroundImage"> | boolean
    createdAt?: DateTimeFilter<"BackgroundImage"> | Date | string
    updatedAt?: DateTimeFilter<"BackgroundImage"> | Date | string
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    usageStats?: UsageStatsCreateNestedOneWithoutUserInput
    countdowns?: CountdownCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthCreateNestedManyWithoutUserInput
    customFonts?: CustomFontCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    usageStats?: UsageStatsUncheckedCreateNestedOneWithoutUserInput
    countdowns?: CountdownUncheckedCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthUncheckedCreateNestedManyWithoutUserInput
    customFonts?: CustomFontUncheckedCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageStats?: UsageStatsUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageStats?: UsageStatsUncheckedUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUncheckedUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUncheckedUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUncheckedUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateWithoutUsageStatsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    countdowns?: CountdownCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthCreateNestedManyWithoutUserInput
    customFonts?: CustomFontCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutUsageStatsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    countdowns?: CountdownUncheckedCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthUncheckedCreateNestedManyWithoutUserInput
    customFonts?: CustomFontUncheckedCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutUsageStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUsageStatsInput, UserUncheckedCreateWithoutUsageStatsInput>
  }

  export type UserUpsertWithoutUsageStatsInput = {
    update: XOR<UserUpdateWithoutUsageStatsInput, UserUncheckedUpdateWithoutUsageStatsInput>
    create: XOR<UserCreateWithoutUsageStatsInput, UserUncheckedCreateWithoutUsageStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUsageStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUsageStatsInput, UserUncheckedUpdateWithoutUsageStatsInput>
  }

  export type UserUpdateWithoutUsageStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    countdowns?: CountdownUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutUsageStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    countdowns?: CountdownUncheckedUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUncheckedUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUncheckedUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateWithoutCountdownsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsCreateNestedOneWithoutUserInput
    usageMonths?: UsageMonthCreateNestedManyWithoutUserInput
    customFonts?: CustomFontCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutCountdownsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsUncheckedCreateNestedOneWithoutUserInput
    usageMonths?: UsageMonthUncheckedCreateNestedManyWithoutUserInput
    customFonts?: CustomFontUncheckedCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutCountdownsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCountdownsInput, UserUncheckedCreateWithoutCountdownsInput>
  }

  export type UserUpsertWithoutCountdownsInput = {
    update: XOR<UserUpdateWithoutCountdownsInput, UserUncheckedUpdateWithoutCountdownsInput>
    create: XOR<UserCreateWithoutCountdownsInput, UserUncheckedCreateWithoutCountdownsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCountdownsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCountdownsInput, UserUncheckedUpdateWithoutCountdownsInput>
  }

  export type UserUpdateWithoutCountdownsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUpdateOneWithoutUserNestedInput
    usageMonths?: UsageMonthUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutCountdownsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUncheckedUpdateOneWithoutUserNestedInput
    usageMonths?: UsageMonthUncheckedUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUncheckedUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateWithoutUsageMonthsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsCreateNestedOneWithoutUserInput
    countdowns?: CountdownCreateNestedManyWithoutOwnerInput
    customFonts?: CustomFontCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutUsageMonthsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsUncheckedCreateNestedOneWithoutUserInput
    countdowns?: CountdownUncheckedCreateNestedManyWithoutOwnerInput
    customFonts?: CustomFontUncheckedCreateNestedManyWithoutOwnerInput
    backgroundImages?: BackgroundImageUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutUsageMonthsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUsageMonthsInput, UserUncheckedCreateWithoutUsageMonthsInput>
  }

  export type UserUpsertWithoutUsageMonthsInput = {
    update: XOR<UserUpdateWithoutUsageMonthsInput, UserUncheckedUpdateWithoutUsageMonthsInput>
    create: XOR<UserCreateWithoutUsageMonthsInput, UserUncheckedCreateWithoutUsageMonthsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUsageMonthsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUsageMonthsInput, UserUncheckedUpdateWithoutUsageMonthsInput>
  }

  export type UserUpdateWithoutUsageMonthsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUpdateManyWithoutOwnerNestedInput
    customFonts?: CustomFontUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutUsageMonthsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUncheckedUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUncheckedUpdateManyWithoutOwnerNestedInput
    customFonts?: CustomFontUncheckedUpdateManyWithoutOwnerNestedInput
    backgroundImages?: BackgroundImageUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateWithoutCustomFontsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsCreateNestedOneWithoutUserInput
    countdowns?: CountdownCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthCreateNestedManyWithoutUserInput
    backgroundImages?: BackgroundImageCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutCustomFontsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsUncheckedCreateNestedOneWithoutUserInput
    countdowns?: CountdownUncheckedCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthUncheckedCreateNestedManyWithoutUserInput
    backgroundImages?: BackgroundImageUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutCustomFontsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomFontsInput, UserUncheckedCreateWithoutCustomFontsInput>
  }

  export type UserUpsertWithoutCustomFontsInput = {
    update: XOR<UserUpdateWithoutCustomFontsInput, UserUncheckedUpdateWithoutCustomFontsInput>
    create: XOR<UserCreateWithoutCustomFontsInput, UserUncheckedCreateWithoutCustomFontsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomFontsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomFontsInput, UserUncheckedUpdateWithoutCustomFontsInput>
  }

  export type UserUpdateWithoutCustomFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUpdateManyWithoutUserNestedInput
    backgroundImages?: BackgroundImageUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomFontsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUncheckedUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUncheckedUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUncheckedUpdateManyWithoutUserNestedInput
    backgroundImages?: BackgroundImageUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateWithoutBackgroundImagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsCreateNestedOneWithoutUserInput
    countdowns?: CountdownCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthCreateNestedManyWithoutUserInput
    customFonts?: CustomFontCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutBackgroundImagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    plan?: $Enums.Plan
    isActive?: boolean
    isVerified?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    subscriptionStatus?: string | null
    currentPeriodEnd?: Date | string | null
    rolloverCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    usageStats?: UsageStatsUncheckedCreateNestedOneWithoutUserInput
    countdowns?: CountdownUncheckedCreateNestedManyWithoutOwnerInput
    usageMonths?: UsageMonthUncheckedCreateNestedManyWithoutUserInput
    customFonts?: CustomFontUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutBackgroundImagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBackgroundImagesInput, UserUncheckedCreateWithoutBackgroundImagesInput>
  }

  export type UserUpsertWithoutBackgroundImagesInput = {
    update: XOR<UserUpdateWithoutBackgroundImagesInput, UserUncheckedUpdateWithoutBackgroundImagesInput>
    create: XOR<UserCreateWithoutBackgroundImagesInput, UserUncheckedCreateWithoutBackgroundImagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBackgroundImagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBackgroundImagesInput, UserUncheckedUpdateWithoutBackgroundImagesInput>
  }

  export type UserUpdateWithoutBackgroundImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutBackgroundImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: EnumPlanFieldUpdateOperationsInput | $Enums.Plan
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rolloverCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    usageStats?: UsageStatsUncheckedUpdateOneWithoutUserNestedInput
    countdowns?: CountdownUncheckedUpdateManyWithoutOwnerNestedInput
    usageMonths?: UsageMonthUncheckedUpdateManyWithoutUserNestedInput
    customFonts?: CustomFontUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    userAgent?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type CountdownCreateManyOwnerInput = {
    id?: string
    title: string
    endAt: Date | string
    timezone?: string
    status?: $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageMonthCreateManyUserInput = {
    id?: string
    year: number
    month: number
    viewsUsed?: number
    viewsLimit: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomFontCreateManyOwnerInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundImageCreateManyOwnerInput = {
    id?: string
    name: string
    fileName: string
    storagePath: string
    fileSize: number
    mimeType: string
    width: number
    height: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    status?: EnumCountdownStatusFieldUpdateOperationsInput | $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    status?: EnumCountdownStatusFieldUpdateOperationsInput | $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    endAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timezone?: StringFieldUpdateOperationsInput | string
    status?: EnumCountdownStatusFieldUpdateOperationsInput | $Enums.CountdownStatus
    styleConfig?: JsonNullValueInput | InputJsonValue
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMonthUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    viewsUsed?: IntFieldUpdateOperationsInput | number
    viewsLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMonthUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    viewsUsed?: IntFieldUpdateOperationsInput | number
    viewsLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMonthUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    viewsUsed?: IntFieldUpdateOperationsInput | number
    viewsLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundImageUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundImageUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundImageUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    storagePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}