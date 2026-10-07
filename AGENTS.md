<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Site architecture
- Keep homepage FAQs in a dedicated section using the shared accordion controls, so answers remain accessible and consistent with the site.
- Reuse shared portfolio and sales-proof sections on the home and work pages so client links and uploaded media stay consistent.
- Store uploaded media and captured portfolio images as Lovable asset pointers to keep binaries outside the source repository.
- Keep social contact links in one shared module so footer and contact page always agree.
- Render the Live Chat contact chooser in the root layout using the shared social links so every content page offers the same contact options.
- Collect client review drafts through an explicit email handoff and publication consent; never display submitted text as approved feedback automatically.
- Keep owner-approved published reviews in a shared static dataset and derive category counts from it; use pagination so the home and work pages stay compact.
- Derive the favicon from the icon portion of the uploaded brand asset so it stays consistent with the site identity.
- Derive sitemap entries from explicit per-route staticData.sitemap decisions using the shared sitemap helper; this keeps public URLs aligned with the router.
