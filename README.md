# 2026-05-14-github-agentic-action-example
A repo to demo a github agentic action which lints poor react code and updates it.

## The problem

This code in `App.tsx` has a problem. 

```typescript
function App() {
  const [input, setInput] = useState(0);
  const [userText, setUserText] = useState("No number is set");

  useEffect(() => {
    if (input === 0) {
      setUserText("No number is set");
    } else {
      setUserText(`You picked ${input}`);
    }
  }, [input, setUserText]);

  return (
    <>
   <h1>Set state in effect demo</h1>

<div style={{display: 'flex'}}>
  <label htmlFor="number-picker">Pick a number:</label>
   <input id="number-picker" type="number" value={input} onChange={(e) => setInput(parseInt(e.target.value))} />
</div>


   <h2>{userText}</h2>
    </>
  )
}
```

If we run eslint with `yarn lint` we get

```bash

error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).
```

## The solution 
We do not need to useEffect to set the value of userText. We can set userText to be a derived value based on input.

```typescript

function App() {
  const [input, setInput] = useState(0);
  const userText = input === 0 ? "No number is set" : `You picked ${input}`;

  return (
    <>
   <h1>Set state in effect demo</h1>

<div style={{display: 'flex'}}>
  <label htmlFor="number-picker">Pick a number:</label>
   <input id="number-picker" type="number" value={input} onChange={(e) => setInput(parseInt(e.target.value))} />
</div>


   <h2>{userText}</h2>
    </>
  )
}
```

## Github agentic workflows

We can use a github agentic workflow to carry out some sort of effect and raise PRs against the repo. In this case lets create a github agentic workflow which runs eslint on this application and raises a pull request to fix an issues found.

### Secrets

The basic workflow will require a secret called `COPILOT_GITHUB_TOKEN` which can be set by navgating to respoitory secrets -> Secrets and variables -> Actions -> Repository secrets.

## Useful gh aw CLI commands

- `gh aw compile` - generates a lock file for the workflow.md file.
- `gh status` - shows the status of all workflows.
- `gh run <WORKFLOW_NAME>` - runs a given workflow
- `gh run <WORKFLOW_NAME> --ref=<BRANCH_NAME>` - runs a given workflow from a given branch (useful for testing)

## Useful resources

- [Github agentic workflows documentation](https://github.github.com/gh-aw/)
- [Asset management ai github workflows](https://github.com/moodysanalytics/asset-management-ai-github-workflows)