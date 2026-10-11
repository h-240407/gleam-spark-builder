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

- Keep the app in TanStack Start with React; this hosted runtime does not support a NestJS application.
- Keep the landing page at `/` and learning demo screens under `/workspace/$section` so each navigation destination has a reloadable URL.
- Keep this reference recreation frontend-only with clearly labeled demo interactions; add managed persistence only when real account or data functionality is requested.
- Define shared visual styles and semantic colors in `src/styles.css` to preserve reference consistency across screens.
