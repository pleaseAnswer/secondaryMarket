int BF(char S[], char T[]) {
    i = 1; j = 1; start = 1;
    while(i < S[0] && j < T[0]) {
        if(S[i] == T[j]) {
            i++; j++
        } else {
            start++; i = start; j = 1;
        }
    }
    if(j > T[0]) return start;
    else return 0;
} 

int KMP(char S[], char T[]) {
    i = 1; j = 1;
    while(i < S[0] && j < T[0]) {
        if(S[i] == T[j]) {
            i++; j++
        } else {
            j = next[j] + 1;
        }
    }
    if(j > T[0]) return start;
    else return 0;
} 
void getNext(char T[], int next[]) {
    //k 匹配的前缀的长度
    next[0] = -1; j = 0; k = -1;
    while(j < T[0]-1) {
        if(k == -1 || T[k] == T[j]) {
            j++; k++; next[j] = k
        } else {
            k = next[k]
        }
    }
}