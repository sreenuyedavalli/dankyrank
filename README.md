# django-react-multi-page-on-heroku

## Running locally

You'll need two terminal windows open - one to run the React compilation toolchain, and another to run Django to
actually serve the site.

```
# In terminal one
./manage.py runserver

# In terminal two
npm run start
```

## Running on Heroku

If you push this directly to a new app on Heroku, it will fail, because the Python buildpack will try to run
before the Node buildpack. After creating the new application:

1. Add the Node buildpack
2. Add the Python buildpack
3. Set the `DJANGO_DEBUG` environment variable to `False`

Then push your project via `git push heroku master`. It should download NPM and install your dependencies for you.

Once it finishes that, it will download Python and do the typical Django build process. Unfortunately the
`bin/post_compile` script runs after the `collectstatic` step, so we call `python manage.py collectstatic` again after
we generate the compiled React code.

Once you've done that, it should be running.
