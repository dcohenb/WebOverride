TODO:
Share override
Build

v1.0.0
- Moved to open source
- Complete re-write of the application
- Scripts are now stored to the chrome storage service, scripts will now sync between the users computers.
- Backup and restore scripts to computer

v0.6.0
- Back to basics, using the chrome sync service to simplify everything
- Moved the project to Github and make it open source
- All icons replaced to font-awesome

v0.4.1
- Disable number of available scripts hint for the current website
- Marked external non-editable overrides in the "All Overrides" Table
- Added moment.js to the list of available libs to hack with

v0.4.0
- External:
  - All new search options to lookup scripts and overrides from the web!
    - now supports styles from stylebot
  - Notify when there are available scripts for download on the website you are visiting
  - UI improvements
  - Bug fixes and performance
  - async.js was added to the list of available libraries to use

- Internal:
  - improved background & front communication
  - added and implemented idb and configAPI service
  - Added moment for clear time understanding

v0.3.0
- Keyboard shortcuts to move between tabs, Use Ctrl + 1-9
- Implemented ACE code editor
  - Select code editor theme from the about screen
- Multiple domain regexp for one role
- Use Ctrl+S keyboard shortcut to save changes
- "waitForElement", "waitForElementVisible" api
- Small UI fixes

v0.2.5
- Fixed analytics keep alive interval bug
- updated icon

v0.2.4
- User module. Creation date, Last interaction time;
- Toggle overrides activity and privacy from the all overrides table
- Add new override on the bottom of the table
- Report script activated to analytics

v0.2.3
- Title should link to edit
- Don't redirect to home after saving
- keep alive event for analytics
- ng-repeat issue in all overrides
- Add created/updated timestamp for scripts on database
- Update button caption text
- Width of input fields after build
- show 'last update' on all overrides table

v0.2.2
- Migrate users scripts to the new database

v0.2.1
- Store data in Remote database

v0.2.0
- New design