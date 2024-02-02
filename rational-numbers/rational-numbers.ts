export class Rational {
  public numerator: number;
  public denominator: number;
  constructor(n: number, d: number) {
    this.numerator = n;
    this.denominator = d;
  }

  add(r: Rational): Rational {
    let res = new Rational(0,0);
    if (this.denominator != r.denominator) {
      res.numerator = (this.numerator * r.denominator) + (r.numerator * this.denominator);
      res.denominator = this.denominator * r.denominator;
    } else {
      res.numerator = this.numerator + r.numerator;
      res.denominator = this.denominator;
    }
    return res.reduce();
  }

  sub(r: Rational): Rational {
    return this.add(new Rational(r.numerator * -1, r.denominator));
  }

  mul(r: Rational): Rational {
    return new Rational(this.numerator * r.numerator, this.denominator * r.denominator).reduce();
  }

  div(r: Rational): Rational {
    return this.mul(new Rational(r.denominator, r.numerator));
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator)).reduce();
  }

  exprational(x: number): Rational {
    if (x < 0) {
      return new Rational(Math.pow(this.denominator, Math.abs(x)), Math.pow(this.numerator, Math.abs(x))).reduce();
    } else {
      return new Rational(Math.pow(this.numerator, Math.abs(x)), Math.pow(this.denominator, Math.abs(x))).reduce();
    }
  }

  expreal(x: number): number {
    return this.root(Math.pow(x, this.numerator), this.denominator);
  }

  //qth root of p
  root(p: number, q: number): number {
    return Math.pow(p, 1/q);
  }

  reduce(): Rational {
    let gcd = this.getGcd(this.numerator, this.denominator);
    if (this.denominator/gcd < 0) {
      return new Rational(this.numerator/gcd * -1, this.denominator/gcd * -1);
    } else {
      return new Rational(this.numerator/gcd, this.denominator/gcd);
    }
  }

  //get greatest common denominator
  getGcd(a: number, b: number): number {
    return b ? this.getGcd(b, a%b) : a;
  }
}
