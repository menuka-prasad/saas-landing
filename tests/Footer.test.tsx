import { Footer } from "@/components/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
    it("renders copyright text", () => {
        render(<Footer />);
        expect(screen.getByText(/© \d{4} Denaro/i)).toBeInTheDocument();
    });
});
