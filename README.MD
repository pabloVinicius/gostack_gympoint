# Gympoint App - Backend (NodeJS Express Server), Frontent (ReactJS) and Mobile (React Native)

* In order to use EsLint/Prettier I had to set the `eslint.workingDirectories` config on my .vscode/settings.json (on root directory). It is like this:

```json
    {
        "eslint.workingDirectories": [
            "backend/src",
            "frontend/src",
            "mobile/src"
        ]
    }
```

### Some points that might be different from the course standard:
#### General
* I've used index files in some folders to simplify the exportation and avoid rewriting a bunch of import lines across the code

#### Front-end
* I've used rem units on sizing to support others displays sizes by permitting the app to resize
* I've used Formik instead Unform because I find easier to control some field based on its state (like the gray fields that are calculated automatically based on other fields)

#### Back-end