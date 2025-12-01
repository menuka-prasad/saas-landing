import { Button } from "@/components/ui/button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
    it("renders text correctly", () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("applies className correctly", () => {
        render(<Button className="bg-red-500">Click Me</Button>);
        expect(screen.getByText("Click Me")).toHaveClass("bg-red-500");
    });
});
