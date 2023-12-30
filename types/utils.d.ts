type OneOnly<Obj, Key extends keyof Obj> = { [key in Exclude<keyof Obj, Key>]: null } & Pick<
  Obj,
  Key
>;

type OneOf<Obj, Key extends keyof Obj> = OneOnly<Obj, Key> &
  Partial<Record<Exclude<keyof Obj, Key>, null>>;
