import Vue from "vue";
import { createVueSupabase } from "vue-supabase";
const supabase = createVueSupabase({
  supabaseUrl: "https://aklzkpvfnihfbrnrjeff.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbHprcHZmbmloZmJybnJqZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4OTg1OTIsImV4cCI6MjAwOTQ3NDU5Mn0.AkuRztI3aS6WcDOef-Tmheghrh8M9KBmONZpvy3DiGE",
});

Vue.use(supabase);

// Inject Supabase into Nuxt Context
export default (ctx, inject) => {
  ctx.$supabase = supabase;
  inject("supabase", supabase);
};
