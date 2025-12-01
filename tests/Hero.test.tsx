import { Hero } from "@/components/sections/HeroSection";
import { render, screen } from "@testing-library/react";

describe("Hero section", () => {
    it("renders heading and subtitle", () => {
        render(<Hero />);
        
        // Check for heading presence
        expect(screen.getByRole("heading")).toBeInTheDocument();
        
        // Check for partial text in subtitle (more flexible)
        expect(screen.getByText(/transform your workflow/i)).toBeInTheDocument();
        expect(screen.getByText(/saas platform/i)).toBeInTheDocument();
    });
});