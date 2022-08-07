const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // remove the hidden class from the install button
    butInstall.classList.toggle = ('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;

    if (!promptEvent) {
        return;
    }

    //show the install prompt
    promptEvent.prompt();

    // reset the deferred prompt variable, since we want to show only one prompt at a time
    window.deferredPrompt = null;
    // hide the install button
    butInstall.classList.toggle = ('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('🎉 - JEST installed');
    // clear the prompt
    window.deferredPrompt = null;
});
