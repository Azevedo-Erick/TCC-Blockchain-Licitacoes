
import scheduler from 'adonisjs-scheduler/services/main'
scheduler.command("sync:blockchain")
    .everyHours(1);
