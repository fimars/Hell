import { parseFrontmatter } from "../../utils/matter";

const content = `
---
title: test
date: 2019-02-03
---
RawContent
`.trim();

it("should be a absolute path", () => {
  const result = parseFrontmatter(content);
  expect(result.data.title).toBe("test");
  expect(result.data.date).toEqual(new Date("2019-02-03"));
  expect(result.content).toBe("RawContent");
});
