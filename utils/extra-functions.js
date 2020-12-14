export const findLeague = `Query(
  Lambda(
    ["slug", "size", "after", "before"],
    Let(
      {
        match: Filter(
          Match(Index("allLeagues")),
          Lambda(
            "ref",
            Let(
              { League: Get(Var("ref")) },
              And(
                If(
                  IsNull(Var("slug")),
                  true,
                  Equals(Select(["data", "slug"], Var("League")), Var("slug"))
                )
              )
            )
          )
        ),
        page: If(
          Equals(Var("before"), null),
          If(
            Equals(Var("after"), null),
            Paginate(Var("match"), { size: Var("size") }),
            Paginate(Var("match"), { after: Var("after"), size: Var("size") })
          ),
          Paginate(Var("match"), { before: Var("before"), size: Var("size") })
        )
      },
      Map(Var("page"), Lambda("ref", Get(Var("ref"))))
    )
  )
)`