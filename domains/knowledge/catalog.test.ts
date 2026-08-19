import { describe, expect, it } from "vitest";
import { KNOWLEDGE_SOURCES, PRINCIPLES } from "./catalog";

describe("knowledge catalog", () => {
  it("tiers every source so later books plug in without new app logic", () => {
    expect(KNOWLEDGE_SOURCES.every((row) => "tier" in row)).toBe(true);
    expect(KNOWLEDGE_SOURCES.find((row) => row.id === "src_akpk")?.tier).toBe("official");
    expect(KNOWLEDGE_SOURCES.find((row) => row.id === "src_housel")?.tier).toBe("book");
  });

  it("adds KCLau as an educator source with four paraphrased principles", () => {
    const source = KNOWLEDGE_SOURCES.find((row) => row.id === "src_kclau");
    expect(source?.kind).toBe("book");
    expect(source?.tier).toBe("educator");
    const kclau = PRINCIPLES.filter((row) => row.sourceId === "src_kclau");
    expect(kclau.map((row) => row.id)).toEqual([
      "pr_sir_saving",
      "pr_sir_income",
      "pr_roadmap_target",
      "pr_leakage",
    ]);
    expect(kclau.every((row) => row.chapter && row.summary && row.explanation)).toBe(true);
  });
});
