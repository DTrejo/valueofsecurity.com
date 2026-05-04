# Vision
- Want to create a security value graph.

- The root nodes are sensitive data (e.g. users with name, ssn, pan), and the running business (revenue).   

- The edges are value of parent node in various scenarios,   
- Give me the two most brilliant and clever examples of measurement from How to Measure Anything (book). Then, I want you to give me ideas for how to measure the ROI of investments in security at Chime Financial (chime.com and mobile banking app)  
- More terms to explore:  
- Applied Information Economics (AIE) Approach: Loss Exceedance Curve.  
- **Expected Opportunity Loss (EOL)**  
- **Sees the UI with data extracted from 10ks?**  
- **Incorporate Monte Carlo ideas and probabilistic spreadsheet stuff from guesstimate?**  
- Douglas hubbard’s how to measure anything book: output the table of contents verbatim  
- Now, give me a holistic playbook for making business decisions (based only on what he says)  
- [https://investors.chime.com/node/7581/html#i1f3f56f875cf425ea78fcca0a339f364_672](https://investors.chime.com/node/7581/html#i1f3f56f875cf425ea78fcca0a339f364_672)  
- Annual loss expectancy. Single loss expectancy   
- Let’s say I want to create data presets for the site based on two companies: chime (10k form), and vercel (whatever we can figure out publicly).  
-  1. Clearly lay out the data we need to collect  
-  2. Create a set of examples ala engineerworth which flow from the data (plain text only for now)  

## Todos
- [ ] good design for editable number + range component
- [ ] use it to build scenario 1: member value based on revenue and complete business stoppage
- [ ] add WIP banner for remaining scenarios and titles in the ToC

- [x] move all URL params into fragment params.
- [x] buy valueofsecurity.com
- [x] add CNAME for above
- [x] create github repo
- [x] deploy site to gh-pages
- [x] set up cloudflare DNS for gh-pages
- = ^_^ MVP ^_^ =
- [ ] devise easily-customized tag-based calculation strategy for more complex calculations
- [ ] figure out explainable code + display of equations in the UI. 
    e.g. each calculation gets a single function, so the fn body's equation can be displayed in the UI and variable names can be substituted with values.
    ideally uses template strings as well. may need to parse the JS, but, maybe not since the variable names will be easy to find+replace.
- [ ] do the rest of the scenarios. try and prompt them from the markdown files and based on the first simple example.
- [ ] write announcement message for linkedin+etc
- [ ] Generate social image
- [ ] Announce on linkedin+etc
- [x] add "copy page as markdown" button so people can give it to their AI to iterate on (which includes the URL & customizations)
- [x] add share / copy URL button 

## Value flow scenarios

1. member value == 3-20x revenue
revenue
ransom amount for complete business stoppage

2. member data
number of members
number of sensitive (confidential, restricted) fields per member (e.g. fintech preset, infra preset which means all industries: fintech + hipaa + government)
fine per confidential, fine per restricted (is it different?)
dark web sale value (PRN mostly?)
bug bounty value

3. vulnerabilities e.g. RCE 
government fine
dark web sale value
bug bounty value

4. government consent order (repeated security issues)
Continuing cost to business per year

5. emotional / brand value
value of member trust

9. founders sleep well at night (salary, full loaded cost, 3-20x impact on revenue)
    founder salary vs revenue
    industry founder salary multiplier
    fully loaded cost multiplier
    3-20x founder value to the company

6. security engineers (?) per engineer
responsibility:
    member value secured per security engineer
    revenue secured per security engineer

7. Single security project
opportunity:
    $ value of risk reduction as result of a project
    loss exceedance curve
    risk tolerance curve
    Value of information
    Applied information economics

8. cyber insurance
Annual cost
1st claim
2nd claim
