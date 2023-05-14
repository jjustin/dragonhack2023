import pandas as pd

def diff (first, firstDesired, second, secondDesired):
    return (abs(first-firstDesired)**2 + abs(second-secondDesired))


def nMainPoliticians(economicPercentile, socialPercentile, stBest):

    df = pd.read_csv('Percentili.csv')
    #print(df)

    df2 = df.iloc[:,0:2]
    #print(df2)
    #print(df.shape[0])
    for ix in range(df.shape[0]):
        df2.iloc[ix, 1] = diff(df.iloc[ix,1], economicPercentile, df.iloc[ix,2], socialPercentile)
    #print(df2)

    enumerated = enumerate(df2)
    df2.sort_values(by=(df.columns[1]), axis=0, inplace=True)
    #print(df2)
    df3 = df2.iloc[0:(stBest), 0]
    # df3.to_csv("bestMentions.txt", index=False, header=False)

    outputArray = []
    for ix in range(df3.size):
        outputArray.append(df3.iloc[ix])

    return outputArray


# for i in range(0, 100, 5):
#     for j in range(0, 100, 5):
#         print(i, j)
#         print(nMainPoliticians(i, j, 5))
