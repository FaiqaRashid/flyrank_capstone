import { render } from "@testing-library/react";
import SectionDivider from "@/app/components/SectionDivider";

describe("SectionDivider component", () => {
  test("renders hidden divider element for screen readers", () => {
    const { container } = render(<SectionDivider />);
    const wrapper = container.querySelector("div[aria-hidden='true']");
    expect(wrapper).toBeInTheDocument();
  });
});
