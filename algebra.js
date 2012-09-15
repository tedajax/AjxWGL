function Vec2(x, y)
{
    this.x = (x !== null && x !== undefined) ? x : 0;
    this.y = (y !== null && y !== undefined) ? y : 0;
};

Vec2.prototype.Clone = function(other)
{
    this.x = other.x;
    this.y = other.y;
};

Vec2.prototype.Add = function(other)
{
    this.x += other.x;
    this.y += other.y;

    return this;
};

Vec2.Add = function(v1, v2)
{
    return new Vec2(v1.x + v2.x, v1.y + v2.y);
};

Vec2.prototype.Sub = function(other)
{
    this.x -= other.x;
    this.y -= other.y;

    return this;
};

Vec2.Sub = function(v1, v2)
{
    return new Vec2(v1.x - v2.x, v1.y - v2.y);
};

Vec2.prototype.Mul = function(scalar)
{
    this.x *= scalar;
    this.y *= scalar;

    return this;
};

Vec2.prototype.MulVec = function(vec)
{
    this.x *= vec.x;
    this.y *= vec.y;
};

Vec2.Mul = function(vec, scalar)
{
    return new Vec2(vec.x * scalar, vec.y * scalar);
};

Vec2.MulVec = function(v1, v2)
{
    return new Vec2(v1.x * v2.x, v1.y * v2.y);
};

Vec2.prototype.Div = function(scalar)
{
    this.Mul(1.0 / scalar);

    return this;
};

Vec2.prototype.DivVec = function(vec)
{
    this.x /= vec.x;
    this.y /= vec.y;
};

Vec2.Div = function(vec, scalar)
{
    return Vec2.Mul(vec, 1.0 / scalar);
};

Vec2.DivVec = function(v1, v2)
{
    return new Vec2(v1.x / v2.x, v1.y / v2.y);
};

Vec2.prototype.Magnitude = function()
{
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vec2.prototype.Normalize = function()
{
    this.Div(this.Magnitude());
};

Vec2.prototype.Normalized = function()
{
    var m = this.Magnitude();
    return new Vec2(this.x / m, this.y / m);
};

Vec2.Distance = function(v1, v2)
{
    return Vec2.Sub(v1, v2).Magnitude();
};

Vec2.prototype.Print = function()
{
    console.log("<" + this.x, this.y + ">");
};

Vec2.prototype.Set = function(x, y)
{
    this.x = (x !== null && x !== undefined) ? x : this.x;
    this.y = (y !== null && y !== undefined) ? y : this.y;
};

Vec2.prototype.Negate = function()
{
    this.x = -x;
    this.y = -y;
};

Vec2.Negate = function(vec)
{
    return new Vec2(-vec.x, -vec.y);
};

Vec2.prototype.Dot = function(vec)
{
    return this.x * vec.x + this.y * vec.y;
};

Vec2.Dot = function(v1, v2)
{
    return v1.x * v2.x + v1.y * v2.y;
};

Vec2.prototype.Midpoint = function()
{
    return new Vec2(this.x / 2, this.y / 2);
};

Vec2.Midpoint = function(vec)
{
    return new Vec2(vec.x / 2, vec.y / 2);
};

Vec2.prototype.Perpendicular = function()
{
    return new Vec2(-this.y, this.x);
};

Vec2.Perpendicular = function(vec)
{
    return new Vec2(-vec.y, vec.x);
};

Vec2.GetDirectionFromRotation = function(rotation)
{
    return new Vec2(Math.cos(rotation), Math.sin(rotation));
};

Vec2.prototype.Flatten = function()
{
    return [this.x, this.y];
};

Vec2.Flatten = function(v)
{
    return [v.x, v.y];
};

Vec2.prototype.To3D = function()
{
    return new Vec3(this.x, this.y, 0.0);
};

Vec2.To3D = function(v)
{
    return new Vec3(v.x, v.y, 0.0);
}

Vec2.ZERO = new Vec2(0.0, 0.0);
Vec2.ONE = new Vec2(1.0, 1.0);
Vec2.UNIT_X = new Vec2(1.0, 0.0);
Vec2.UNIT_Y = new Vec2(0.0, 1.0);

function Vec3(x, y, z)
{
    this.x = (x !== null && x !== undefined) ? x : 0;
    this.y = (y !== null && y !== undefined) ? y : 0;
    this.z = (z !== null && z !== undefined) ? z : 0;
};

Vec3.prototype.Clone = function(other)
{
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
};

Vec3.prototype.Add = function(other)
{
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;

    return this;
};

Vec3.Add = function(v1, v2)
{
    return new Vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
};

Vec3.prototype.Sub = function(other)
{
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;

    return this;
};

Vec3.Sub = function(v1, v2)
{
    return new Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
};

Vec3.prototype.Mul = function(scalar)
{
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;

    return this;
};

Vec3.prototype.MulVec = function(vec)
{
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;
};

Vec3.Mul = function(vec, scalar)
{
    return new Vec3(vec.x * scalar, vec.y * scalar, vec.z * scalar);
};

Vec3.MulVec = function(v1, v2)
{
    return new Vec3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
};

Vec3.prototype.Div = function(scalar)
{
    this.Mul(1.0 / scalar);

    return this;
};

Vec3.prototype.DivVec = function(vec)
{
    this.x /= vec.x;
    this.y /= vec.y;
    this.z /= vec.z;
};

Vec3.Div = function(vec, scalar)
{
    return Vec3.Mul(vec, 1.0 / scalar);
};

Vec3.DivVec = function(v1, v2)
{
    return new Vec3(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
};

Vec3.prototype.Magnitude = function()
{
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vec3.prototype.Normalize = function()
{
    this.Div(this.Magnitude());
};

Vec3.prototype.Normalized = function()
{
    var m = this.Magnitude();
    return new Vec3(this.x / m, this.y / m, this.z / m);
};

Vec3.Distance = function(v1, v2)
{
    return Vec3.Sub(v1, v2).Magnitude();
};

Vec3.prototype.Print = function()
{
    console.log("<" + this.x, this.y, this.z + ">");
};

Vec3.prototype.Set = function(x, y, z)
{
    this.x = (x !== null && x !== undefined) ? x : this.x;
    this.y = (y !== null && y !== undefined) ? y : this.y;
    this.z = (z !== null && z !== undefined) ? z : this.z;
};

Vec3.prototype.Negate = function()
{
    this.x = -x;
    this.y = -y;
    this.z = -z;
};

Vec3.Negate = function(vec)
{
    return new Vec3(-vec.x, -vec.y, -vec.z);
};

Vec3.prototype.Dot = function(vec)
{
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
};

Vec3.Dot = function(v1, v2)
{
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};

Vec3.prototype.Cross = function(vec)
{
    a1 = this.x;
    a2 = this.y;
    a3 = this.z;
    b1 = vec.x;
    b2 = vec.y;
    b3 = vec.z;

    return new Vec3(a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1);
};

Vec3.Cross = function(v1, v2)
{
    a1 = v1.x;
    a2 = v1.y;
    a3 = v1.z;
    b1 = v2.x;
    b2 = v2.y;
    b3 = v2.z;

    return new Vec3(a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1);
};

Vec3.prototype.Midpoint = function()
{
    return new Vec3(this.x / 2, this.y / 2, this.z / 2);
};

Vec3.Midpoint = function(vec)
{
    return new Vec3(vec.x / 2, vec.y / 2, vec.z / 2);
};

Vec3.prototype.Flatten = function()
{
    return [this.x, this.y, this.z];
};

Vec3.Flatten = function(v)
{
    return [v.x, v.y, v.z];
};

Vec3.prototype.Transform = function(matrix)
{
    //TODO: matrix shit
};

Vec3.ZERO = new Vec3(0.0, 0.0, 0.0);
Vec3.ONE = new Vec3(1.0, 1.0, 1.0);
Vec3.RIGHT = new Vec3(1.0, 0.0, 0.0);
Vec3.LEFT = new Vec3(0.0, 1.0, 0.0);
Vec3.UP = new Vec3(0.0, 1.0, 0.0);
Vec3.DOWN = new Vec3(0.0, -1.0, 0.0);
Vec3.FORWARD = new Vec3(0.0, 0.0, -1.0);
Vec3.BACKWARD = new Vec3(0.0, 0.0, 1.0);

function Vec4(x, y, z, w)
{
    this.x = (x !== null && x !== undefined) ? x : 0;
    this.y = (y !== null && y !== undefined) ? y : 0;
    this.z = (z !== null && z !== undefined) ? z : 0;
    this.w = (w !== null && w !== undefined) ? w : 0;
};

Vec4.prototype.Clone = function(other)
{
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    this.w = other.w;
};

Vec4.prototype.Add = function(other)
{
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    this.w += other.w;

    return this;
};

Vec4.Add = function(v1, v2)
{
    return new Vec4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
};

Vec4.prototype.Sub = function(other)
{
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    this.w -= other.w;

    return this;
};

Vec4.Sub = function(v1, v2)
{
    return new Vec4(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
};

Vec4.prototype.Mul = function(scalar)
{
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;

    return this;
};

Vec4.prototype.MulVec = function(vec)
{
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;
    this.w *= vec.w;
};

Vec4.Mul = function(vec, scalar)
{
    return new Vec4(vec.x * scalar, vec.y * scalar, vec.z * scalar, vec.w * scalar);
};

Vec4.MulVec = function(v1, v2)
{
    return new Vec4(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w);
};

Vec4.prototype.Div = function(scalar)
{
    this.Mul(1.0 / scalar);

    return this;
};

Vec4.prototype.DivVec = function(vec)
{
    this.x /= vec.x;
    this.y /= vec.y;
    this.z /= vec.z;
    this.w /= vec.w;
};

Vec4.Div = function(vec, scalar)
{
    return Vec4.Mul(vec, 1.0 / scalar);
};

Vec4.DivVec = function(v1, v2)
{
    return new Vec4(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z, v1.w / v2.w);
};

Vec4.prototype.Magnitude = function()
{
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
};

Vec4.prototype.Normalize = function()
{
    this.Div(this.Magnitude());
};

Vec4.prototype.Normalized = function()
{
    var m = this.Magnitude();
    return new Vec4(this.x / m, this.y / m, this.z / m, this.w / m);
};

Vec4.Distance = function(v1, v2)
{
    return Vec4.Sub(v1, v2).Magnitude();
};

Vec4.prototype.Print = function()
{
    console.log("<" + this.x, this.y, this.z, this.w + ">");
};

Vec4.prototype.Set = function(x, y, z, w)
{
    this.x = (x !== null && x !== undefined) ? x : this.x;
    this.y = (y !== null && y !== undefined) ? y : this.y;
    this.z = (z !== null && z !== undefined) ? z : this.z;
    this.w = (w !== null && w !== undefined) ? w : this.w;
};

Vec4.prototype.Negate = function()
{
    this.x = -x;
    this.y = -y;
    this.z = -z;
    this.w = -w;
};

Vec4.Negate = function(vec)
{
    return new Vec4(-vec.x, -vec.y, -vec.z, -vec.w);
};

Vec4.prototype.Dot = function(vec)
{
    return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
};

Vec4.Dot = function(v1, v2)
{
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
};

Vec4.prototype.Cross = function(vec)
{
    a1 = this.x;
    a2 = this.y;
    a3 = this.z;
    b1 = vec.x;
    b2 = vec.y;
    b3 = vec.z;

    return new Vec3(a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1);
};

Vec4.Cross = function(v1, v2)
{
    a1 = this.x;
    a2 = this.y;
    a3 = this.z;
    b1 = vec.x;
    b2 = vec.y;
    b3 = vec.z;

    return new Vec4(a2*b3 - a3*b2, a3*b1 - a1*b3, a1*b2 - a2*b1);
};

Vec4.prototype.Midpoint = function()
{
    return new Vec4(this.x / 2, this.y / 2, this.z / 2, this.w / 2);
};

Vec4.Midpoint = function(vec)
{
    return new Vec4(vec.x / 2, vec.y / 2, vec.z / 2, vec.w / 2);
};

Vec4.prototype.Flatten = function()
{
    return [this.x, this.y, this.z, this.w];
};

Vec4.Flatten = function(v)
{
    return [v.x, v.y, v.z, this.w];
};

Vec4.prototype.Transform = function(matrix)
{
    //TODO: matrix shit
};

Vec4.prototype.to3D = function()
{
    return new Vec3(this.x, this.y, this.z);
};

Vec4.to3D = function(v)
{
    return new Vec3(this.x, this.y, this.z)
}

Vec4.ZERO = new Vec4(0.0, 0.0, 0.0, 0.0);
Vec4.ONE = new Vec4(1.0, 1.0, 1.0, 1.0);
Vec4.UNIT_X = new Vec4(1.0, 0.0, 0.0, 0.0);
Vec4.UNIT_Y = new Vec4(0.0, 1.0, 0.0, 0.0);
Vec4.UNIT_Z = new Vec4(0.0, 0.0, 1.0, 0.0);
Vec4.UNIT_W = new Vec4(0.0, 0.0, 0.0, 1.0);
