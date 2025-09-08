import bcrypt from "bcryptjs";

const hash = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

console.log(await hash("123uareadickhead"));

console.log(
  await bcrypt.compare(
    "123uareadickhead",
    "$2b$10$r9QGCDYyWzC281ZZUUjPX.BJSmx4X/s4374tz6Tjk8L/0Z09RKJia"
  )
);
