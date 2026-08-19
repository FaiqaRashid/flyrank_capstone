import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "@/app/components/Hero";

// Mock Next Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

describe("Hero component", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  test("renders kicker tag, main headline, and developer portrait", () => {
    render(<Hero />);

    expect(screen.getByText(/faiqa rashid \/\/ portfolio/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /the best way to learn technology is by actually building it/i })).toBeInTheDocument();
    expect(screen.getByAltText(/faiqa rashid - developer portrait/i)).toBeInTheDocument();
  });

  test("clicking Download CV triggers resume download link click", async () => {
    const user = userEvent.setup();
    const linkClickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(<Hero />);

    const downloadBtn = screen.getByRole("button", { name: /download faiqa rashid's pdf resume/i });
    await user.click(downloadBtn);

    expect(linkClickSpy).toHaveBeenCalled();
    linkClickSpy.mockRestore();
  });

  test("clicking View Projects scrolls to projects section", async () => {
    const user = userEvent.setup();
    const projectsSec = document.createElement("section");
    projectsSec.id = "projects";
    document.body.appendChild(projectsSec);

    render(<Hero />);

    const viewProjectsLink = screen.getByRole("link", { name: /view projects ↓/i });
    await user.click(viewProjectsLink);

    expect(projectsSec.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(projectsSec);
  });
});
