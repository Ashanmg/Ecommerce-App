using System;
using System.Threading;
using System.Threading.Tasks;

namespace ZeroPoint2.Core
{
    public static class ActionRetryer
    {
        public static async Task RetryWhenExceptionAsync(Func<Task> action, Func<Exception, bool> isRetryable)
        {
            var maxAttempts = 4;
            var retryIntervals = new decimal[] { 0.5M, 2, 3 };

            Exception lastException = null;

            for (var attempt = 1; attempt <= maxAttempts; attempt++)
            {
                if (attempt > 1)
                {
                    Thread.Sleep((int)(1000 * retryIntervals[attempt - 2]));
                }

                try
                {
                    await action();

                    return;
                }
                catch (Exception e)
                {
                    lastException = e;

                    if (isRetryable(e))
                    {
                        continue;
                    }
                    else
                    {
                        break;
                    }
                }
            }

            if (lastException != null)
            {
                throw lastException;
            }
        }
    }
}
