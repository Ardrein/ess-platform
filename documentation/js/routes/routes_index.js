var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"appRoutes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"/home","pathMatch":"full"},{"path":"home","component":"SpreadsheetLoaderComponent"},{"path":"concept","loadChildren":"./modules/concept/concept.module#ConceptModule","children":[{"kind":"module","children":[{"name":"conceptRoutes","filename":"src/app/modules/concept/concept-routing.module.ts","module":"ConceptRoutingModule","children":[{"path":"","component":"ModelConceptComponent"}],"kind":"module"}],"module":"ConceptModule"}]},{"path":"user","loadChildren":"./modules/user/user.module#UserModule","children":[{"kind":"module","children":[{"name":"userRoutes","filename":"src/app/modules/user/user-routing.module.ts","module":"UserRoutingModule","children":[{"path":"","component":"UserModelsComponent"}],"kind":"module"}],"module":"UserModule"}]},{"path":"valuation","loadChildren":"./modules/valuation/valuation.module#ValuationModule","children":[{"kind":"module","children":[{"name":"valuationRoutes","filename":"src/app/modules/valuation/valuation-routing.module.ts","module":"ValuationRoutingModule","children":[{"path":"","component":"ValuationComponent"},{"path":"valuate","component":"ModelValuationComponent"}],"kind":"module"}],"module":"ValuationModule"}]},{"path":"**","redirectTo":"/home"}],"kind":"module"}]}
