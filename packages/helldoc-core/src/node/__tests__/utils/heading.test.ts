import { extractHeaders } from "../../util/heading";

it("extract headers correctly", () => {
  const headers = extractHeaders(
    `
# t1
## t1-1
## t1-2
### t1-2-1
# t2
## t2-1
### t2-1-1
## t2-2
  `.trim()
  );
  expect(headers).toMatchSnapshot();
});
