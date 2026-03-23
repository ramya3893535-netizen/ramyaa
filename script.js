const SUPABASE_URL = 'https://ktauzfdbwjepydhqwhyl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0YXV6ZmRid2plcHlkaHF3aHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTI0MDcsImV4cCI6MjA4OTc2ODQwN30.5AGavnWc7P3NZcrNvsMwRBf6Z0tF0XvM4IgFcPJeMkY';

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, email, message }]);

        if (error) {
            console.error('Error:', error);
            alert('Error sending message: ' + error.message);
        } else {
            console.log('Success:', data);
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            // Reset form
            document.getElementById('contactForm').reset();
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred. Please try again.');
    }
});
