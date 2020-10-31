from itoit import app
import config

if __name__ == '__main__':
    app.run(debug=config.run_on_debug,
            host=config.run_on_host, use_reloader=False)
