import { defineContract } from "@prisma/orm-postgres/contract-builder";

export const contract = defineContract({}, ({ field, model, rel }) => {
  const User = model("User", {
    fields: {
      id: field.id.uuidv7String(),
      email: field.text().unique(),
      username: field.text().optional(),
      name: field.text().optional(),

      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const Decision = model("Decision", {
    fields: {
      id: field.id.uuidv7String(),

      title: field.text(),
      context: field.text().optional(),
      decision: field.text(),
      reason: field.text(),

      alternativeConsiderations: field.text().optional(),
      assumptions: field.text().optional(),
      expectedOutcome: field.text().optional(),

      confidence: field.int(),

      decisionDate: field.dateTime(),
      reviewDate: field.dateTime(),

      status: field.text(),

      authorId: field.uuidString(),

      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const DecisionReview = model("DecisionReview", {
    fields: {
      id: field.id.uuidv7String(),

      actualOutcome: field.text(),
      result: field.text(),
      lessons: field.text().optional(),

      reviewedAt: field.dateTime(),

      decisionId: field.uuidString(),

      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  return {
    models: {
      User: User.relations({
        decisions: rel.hasMany(Decision, { by: "authorId" }),
      }),

      Decision: Decision.relations({
        author: rel.belongsTo(User, {
          from: "authorId",
          to: "id",
        }),

        reviews: rel.hasMany(DecisionReview, {
          by: "decisionId",
        }),
      }),

      DecisionReview: DecisionReview.relations({
        decision: rel.belongsTo(Decision, {
          from: "decisionId",
          to: "id",
        }),
      }),
    },
  };
});
