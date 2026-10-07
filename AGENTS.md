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
- Reuse shared portfolio and sales-proof sections on the home and work pages so client links and uploaded media stay consistent.
- Store uploaded media and captured portfolio images as Lovable asset pointers to keep binaries outside the source repository.
- Keep social contact links in one shared module so footer and contact page always agree.
- Derive sitemap entries from explicit per-route staticData.sitemap decisions using the shared sitemap helper; this keeps public URLs aligned with the router.
