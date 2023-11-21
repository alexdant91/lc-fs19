class Rectangle {
    constructor(h, b) {
        this.h = h;
        this.b = b;
    }
}

class Circle {
    constructor(r) {
        this.r = r;
    }
}


class RectangleCalculator extends Rectangle {
    #area;
    #perimeter;
    #unitCoeff;

    constructor({h, b, unit = "cm"}) {
        super(h, b);
        this.unit = unit;

        this.#calculateCoeff();
    }

    #calculateCoeff = () => {
        const unitMap = {
            m: 0.01,
            dm: 0.1,
            cm: 1,
            mm: 10,
        }

        if (unitMap[this.unit]) {
            this.#unitCoeff = unitMap[this.unit];
        } else {
            throw new Error("Unit not valid");
        }
    }

    setUnit = (unit) => {
        this.unit = unit;
        this.#calculateCoeff();
        return this;
    }

    area = () => {
        this.#area = `${this.h * this.b * this.#unitCoeff}${this.unit}`;
        return this;
    }

    perimeter = () => {
        this.#perimeter = `${((this.b + this.h) * 2) * this.#unitCoeff}${this.unit}`;
        return this;
    }

    print = (what = "area") => {
        if (what == "area") {
            console.log(this.#area);
        } else if (what == "perimeter") {
            console.log(this.#perimeter);
        }
        return this;
    }
}

class CircleCalculator extends Circle {
    #area;
    #perimeter;
    #unitCoeff;

    constructor({r, unit = "cm"}) {
        super(r);
        this.unit = unit;

        this.#calculateCoeff();
    }

    #calculateCoeff = () => {
        const unitMap = {
            m: 0.01,
            dm: 0.1,
            cm: 1,
            mm: 10,
        }

        if (unitMap[this.unit]) {
            this.#unitCoeff = unitMap[this.unit];
        } else {
            throw new Error("Unit not valid");
        }
    }

    setUnit = (unit) => {
        this.unit = unit;
        this.#calculateCoeff();
        return this;
    }

    area = () => {
        this.#area = `${(this.r * this.r * Math.PI * this.#unitCoeff).toFixed(2)}${this.unit}`;
        return this;
    }

    perimeter = () => {
        this.#perimeter = `${(this.r * 2 * Math.PI * this.#unitCoeff).toFixed(2)}${this.unit}`;
        return this;
    }

    print = (what = "area") => {
        if (what == "area") {
            console.log(this.#area);
        } else if (what == "perimeter") {
            console.log(this.#perimeter);
        }
        return this;
    }
}

class Calculator {
    constructor(figure = "rectangle") {
        this.figure = figure;
    }

    exec = (options) => {
        if (this.figure == "rectangle") {
            return new RectangleCalculator({...options});
        } else if(this.figure == "circle") {
            return new CircleCalculator({...options});
        }
    }
}

const rectangleCalculator = new Calculator("rectangle").exec({h: 5, b: 10, unit: "m"});

rectangleCalculator.area().print("area");

const circleCalculator =  new Calculator("circle").exec({r: 5, unit: "m"});

circleCalculator.area().print("area");