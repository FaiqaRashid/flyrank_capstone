import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("./components/Hero", () => () => <div data-testid="mock-hero">Hero</div>);
jest.mock("./components/About", () => () => <div data-testid="mock-about">About</div>);
jest.mock("./components/Skills", () => () => <div data-testid="mock-skills">Skills</div>);
jest.mock("./components/Projects", () => () => <div data-testid="mock-projects">Projects</div>);
jest.mock("./components/Contact", () => () => <div data-testid="mock-contact">Contact</div>);
jest.mock("./components/SectionDivider", () => () => <div data-testid="mock-divider">Divider</div>);

describe("Home main page", () => {
  test("renders all main portfolio sections and dividers", async () => {
    render(<Home />);

    expect(await screen.findByTestId("mock-hero")).toBeInTheDocument();
    expect(await screen.findByTestId("mock-about")).toBeInTheDocument();
    expect(await screen.findByTestId("mock-skills")).toBeInTheDocument();
    expect(await screen.findByTestId("mock-projects")).toBeInTheDocument();
    expect(await screen.findByTestId("mock-contact")).toBeInTheDocument();
    expect((await screen.findAllByTestId("mock-divider")).length).toBe(4);
  });
});
