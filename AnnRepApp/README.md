# README

`reports/show.html.erb` - menuProps: user, report, parts.
|
|
|
|
Placeholder[user, report, parts, part, section]
|
|
|---- Menu[user, report, parts] - user, report, parts, indexSectionShow --^-- section, part
|       |
|       |---- NewPart[editable, title, user, report] - user, report, getParts.
|       |
|       |---- EditPart[editable, title, user, report, sections]- part, user, report, handleUpdate, getParts, passSectionShow --^-- section, part
|              |
|              |---- EditSection[editable, title, user, report, part, section] - section, part, user, report, getSections, sectionUpdate --^-- section.id, title
|              |
|              |---- NewSection[editable, title, user, report, part] - part, user, report, getSections
|
|
|---- Display[user, report] - user, report, part, section.
